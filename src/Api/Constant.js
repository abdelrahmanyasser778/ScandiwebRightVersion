export const GRAPHQL_API = "http://localhost:4000/";

export const GET_PAGE_NAME_QUERY = `

query name
  {
    categories {
      name
    }
  }


`

export const GET_ALL = `

query ALL
 {
    category {
      name
      products {
        id
        name
        prices {
          amount
          currency {
            symbol
          }
        }
        gallery
        inStock
        description
        category
        brand
      }
    }
  }

`
export const GET_PRICE = `
query curr{
  currencies {
    label
    symbol
  }
}

`

export const GET_THE_REST = `

{
  categories {
      name
      products {
        id
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        inStock
        gallery
        category
        description
        attributes {
          id
          name
          items {
            displayValue
            value
            id
          }
        }
      }
    }
}

`

export const FETCH_PRODUCT_BY_ID = `
  query FetchProductById($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      brand
      gallery
      description
      attributes {
        name
        id
        type
        items {
          id
          value
          displayValue
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;


export const ProdInfo = `
query product($id: String!) {
  product(id: $id) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
      }
      amount
    }
    brand
  }
}

`