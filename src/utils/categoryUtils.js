export const getBrandNames = (products) => {
    let brandNames = [];
    let brandObj = {};
    products.forEach((product) => {
        if (product.brand) {
            brandObj[product.brand] = true;
        }
    });
    for (const key in brandObj) {
        brandNames.push({
            displayName: key,
            name: key.toLocaleLowerCase()
        });
    }
    return brandNames;
}

export const getRatings = () => {
    let ratings = [];
    for (let i = 5; i > 0; i--) {
        ratings.push({
            displayName: `${i} Star ${i > 1 ? 'Ratings' : 'Rating'}`,
            name: `${i}`
        })
    }
    return ratings;
}

export const filterByBrand = (products, brands) => {
    return products.filter((product) => brands.includes(product.brand.toLowerCase()));
}

export const filterByRating = (products, ratingsFilter) => {
    let list = [];
    ratingsFilter.map((rating) => {
        let ratingFilter = products.filter((product) => product.rating >= +rating && product.rating <= +rating + 1);
        list = [
            ...list,
            ...ratingFilter,
        ];
    });
    return list;
}


export const filterProductList = (selectedFilters, products) => {
    const { brand = [], rating = [] } = selectedFilters;
    const brandFilteredData = brand.length > 0 ? filterByBrand(products, brand) : products;
    const ratingFilteredData = rating.length > 0 ? filterByRating(brandFilteredData, rating) : brandFilteredData;
    return ratingFilteredData;
}
