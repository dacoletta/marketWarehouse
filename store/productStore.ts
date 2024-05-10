

export const useProductStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchProducts() {
      let {products} = await fetch('https://dummyjson.com/products').then(res => res.json());
      this.setProducts(products);
    },
    setProducts(products: any) {
      this.products = products.sort((a: { id: number; }, b: { id: number; }) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));;
    },
    async addProduct(product: any) {
      await this.setProducts([...this.products, product]);
    },
    deleteProduct(idProduct: any) {
      const index = this.products.findIndex((item: { id: any; }) => item.id === idProduct);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    },
    updateProduct(updatedProduct: any) {
      const productsUpdated = this.products.map((item: any) => {
        if (item.id === updatedProduct.id) {
          return updatedProduct;
        } else {
          return item;
        }
      });
      this.setProducts(productsUpdated);
    }
  }
  
})