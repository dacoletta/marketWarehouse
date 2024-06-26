

export const useProductStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchProducts() {
      let {products} = await fetch('https://dummyjson.com/products').then(res => res.json());
      this.setProducts(products);
    },
    /**
     * Set products
     * @param products 
     */
    setProducts(products: any) {
      this.products = products.sort((a: { id: number; }, b: { id: number; }) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));
      localStorage.setItem('products', JSON.stringify(this.products));
    },
    /**
     * Add new product
     * @param product
     */
    addProduct(product: any) {
      product.id = getNewId(this.products);
      this.setProducts([...this.products, product]);
    },
    /**
     * Remove product
     * @param idProduct 
     */
    deleteProduct(idProduct: any) {
      const index = this.products.findIndex((item: { id: any; }) => item.id === idProduct);
      if (index !== -1) {
        this.products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(this.products));
      }
    },
    /**
     * Edit product
     * @param updatedProduct 
     */
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