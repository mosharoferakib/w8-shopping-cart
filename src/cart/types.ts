interface Sign {
    [key: string]: number
}

const formatterUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export { Sign, formatterUSD }