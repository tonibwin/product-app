package main

import (
    "fmt"
	"encoding/json"
    "context"
    "errors"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
    "github.com/gorilla/mux"
    "sort"
    "api/internal/products"
    "strconv"
    _ "embed"
)

//go:embed testdata/mock_products.json
var mockProductsData []byte

func getMockProducts() (products.Products, error) {
    var mockProducts  products.Products

    err := json.Unmarshal(mockProductsData, &mockProducts)
    if err != nil {
        return products.Products{}, fmt.Errorf("Error unmarshalling mock data: %v", err)
    }
    return mockProducts, nil
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func getProducts(w http.ResponseWriter, r *http.Request) {
    enableCORS(w)

    sortByParam := r.URL.Query().Get("sortBy")
    pageParam := r.URL.Query().Get("page")
    limitParam := r.URL.Query().Get("limit")

    page, err := strconv.Atoi(pageParam)
    if err != nil {
        http.Error(w, "Page parameter is required", http.StatusBadRequest)
        return
    } 
    if page < 1 {
        page = 1
    }

    limit, err := strconv.Atoi(limitParam)
    if err != nil {
        http.Error(w, "Limit parameter is required", http.StatusBadRequest)
        return    
    } 
    if limit < 1 {
        limit = 1
    }

    mockProducts, err := getMockProducts()
    if err != nil {
        http.Error(w, "Failed to get products", http.StatusInternalServerError)
        return
    }
    items := mockProducts.Product.Data.Items

    for _, item := range items {
        if _, err := strconv.Atoi(item.TotalReviews); err != nil {
            http.Error(w, "Unable to parse TotalReviews to integer", http.StatusBadRequest)
            return
        }
        if _, err := strconv.ParseFloat(item.Rating, 64); err != nil {
            http.Error(w, "Unable to parse Rating to integer", http.StatusBadRequest)
            return
        }
    }

    switch sortByParam {
    case "mostReviewed":
        sort.Slice(items, func(i, j int) bool {
            review1, _ := strconv.Atoi(items[i].TotalReviews)
            review2, _ := strconv.Atoi(items[j].TotalReviews)
            return review1 > review2
        })

    case "bestRated":
        sort.Slice(items, func(i, j int) bool {
            rating1, _ := strconv.ParseFloat(items[i].Rating, 64)
            rating2, _ := strconv.ParseFloat(items[j].Rating, 64)
            return rating1 > rating2
        })
    default:
        http.Error(w, "Invalid sortBy value", http.StatusBadRequest)
        return
    } 

    offset := (page - 1) * limit
    end := offset + limit
    if end >= len(items) {
        end = len(items)
        mockProducts.LastPage = true
    } else {
        mockProducts.LastPage = false
    }
    mockProducts.Product.Data.Items = items[offset : end]

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(mockProducts)
}

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/products", getProducts).Methods("GET")

    server := &http.Server{
        Addr: ":8080",
        Handler: r,
    }

    go func() {
        if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
            log.Fatalf("HTTP server error: %v", err)
        }
        log.Println("Stopped serving new connections.")
    }()

    sigChan := make(chan os.Signal, 1)
    signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
    <-sigChan

    shutdownCtx, shutdownRelease := context.WithTimeout(context.Background(), 10*time.Second)
    defer shutdownRelease()

    if err := server.Shutdown(shutdownCtx); err != nil {
        log.Fatalf("shutdown error: %v", err)
    }
    log.Println("shutdown complete.")
}