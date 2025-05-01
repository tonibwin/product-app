package products

type Products struct {
    Product Product `json:"products"`
    LastPage bool `json:"lastPage"` // Added lastPage property
}

type Product struct {
    Data    Data    `json:"data"`
}

type Data struct {
    Items   []Item  `json:"items"`
}

type Item struct {
    Id          string    `json:"id"`
    Name        string    `json:"name"`
    Price       string    `json:"price"`
    TotalReviews string    `json:"totalReviews"` // Changed TotalReview to TotralReviews with a 's'
    Rating      string    `json:"rating"` // Changed Rating to rating. Adjusting to camelcase convention style
}