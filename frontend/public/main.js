let productList = [
    {
        _id: '1',
        name: 'Distressed Lightblue Jeans',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse deserunt unde id commodi quam dolorum autem tenetur corporis ipsa iure perspiciatis obcaecati suscipit, architecto doloremque odit soluta reiciendis repellendus ex alias sed? Voluptates, deserunt quam.',
        brand: 'Latania',
        category: 'Clothing',
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReview: 4,
    },
    {
        _id: '2',
        name: 'Distressed Lightblue Jeans',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse deserunt unde id commodi quam dolorum autem tenetur corporis ipsa iure perspiciatis obcaecati suscipit, architecto doloremque odit soluta reiciendis repellendus ex alias sed? Voluptates, deserunt quam.',
        brand: 'Latania',
        category: 'Clothing',
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReview: 4,
    },
    {
        _id: '3',
        name: 'Distressed Lightblue Jeans',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse deserunt unde id commodi quam dolorum autem tenetur corporis ipsa iure perspiciatis obcaecati suscipit, architecto doloremque odit soluta reiciendis repellendus ex alias sed? Voluptates, deserunt quam.',
        brand: 'Latania',
        category: 'Clothing',
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReview: 4,
    },
    {
        _id: '4',
        name: 'Distressed Lightblue Jeans',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse deserunt unde id commodi quam dolorum autem tenetur corporis ipsa iure perspiciatis obcaecati suscipit, architecto doloremque odit soluta reiciendis repellendus ex alias sed? Voluptates, deserunt quam.',
        brand: 'Latania',
        category: 'Clothing',
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReview: 4,
    },
    {
        _id: '5',
        name: 'Distressed Lightblue Jeans',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse deserunt unde id commodi quam dolorum autem tenetur corporis ipsa iure perspiciatis obcaecati suscipit, architecto doloremque odit soluta reiciendis repellendus ex alias sed? Voluptates, deserunt quam.',
        brand: 'Latania',
        category: 'Clothing',
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReview: 4,
    },
    {
        _id: '6',
        name: 'Distressed Lightblue Jeans',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse deserunt unde id commodi quam dolorum autem tenetur corporis ipsa iure perspiciatis obcaecati suscipit, architecto doloremque odit soluta reiciendis repellendus ex alias sed? Voluptates, deserunt quam.',
        brand: 'Latania',
        category: 'Clothing',
        price: 29.99,
        countInStock: 0,
        rating: 4,
        numReview: 4,
    },
]

// Make link underline on product card hover 

let productCard = document.querySelectorAll(".home-products > .card")
productCard.forEach(product => {
    let productTitle = product.querySelector('a')
    product.addEventListener("mouseenter", () => {
        productTitle.style.textDecoration = "underline"
        productTitle.style.color = "var(--secondary-color)"
    })
    product.addEventListener("mouseleave", () => {
        productTitle.style.textDecoration = "none"
        productTitle.style.color = "var(--primary-font-color)"
    })
})