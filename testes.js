
async function getBrand() {

    const res = await fetch('/api/v2/brands')
    const data = await res.json()
    console.log(data);
}

getBrand()