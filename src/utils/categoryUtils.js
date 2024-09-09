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
            name: key.toLocaleLowerCase().split(' ').join('_')
        });
    }
    console.log('check - 1', brandNames);
    return brandNames;
}

export const getRatings = () => {
    let ratings = [];
    for (let i = 5; i > 0; i--) {
        ratings.push({
            displayName: `${i} Star ${i > 1 ? 'Ratings' : 'Rating'}`,
            name: `${i}_start_ratings`
        })
    }
    return ratings;
}
