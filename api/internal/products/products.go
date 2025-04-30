package products

type Products struct {
    Product Product `json:"products"`
    Page int `json:"page"`
    Limit int `json:"limit"`
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
    TotalReviews string    `json:"totalreviews"`
    Rating      string    `json:"Rating"`
}