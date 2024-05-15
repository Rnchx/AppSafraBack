import Product from "../models/products/Product.js"
import ProductsRepository from "../models/products/ProductsRepository.js";

const productsRepository = new ProductsRepository();

function verifyUrl(url) {
  var imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  
    var extension = url.split('.').pop().toLowerCase();

    return imageExtensions.includes(extension);
}

export const getProducts = async (req, res) => {
  try {
    const products = await productsRepository.getProducts();
    if (!products || products.length === 0) {
      return res.status(404).send({ message: "Não há produtos cadastrados"});
    }
    return res.status(200).send({ totalProducts: products.length, products });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao buscar produtos", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsRepository.getProductById(id);
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }
    return res.status(200).send({ message: "Produto encontrado", product });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao buscar produto", error: error.message });
  }
};

export const getProductByName = async (req, res) => {
try {
  const { name } = req.params;
  const product = await productsRepository.getProductByName(name);

  if (!product) {
    return res.status(404).send({ message: "Produto não encontrado" });
  }

  return res.status(200).send({ message: "Produto encontrado", product });
} catch (error) {
   return res
      .status(500)
      .send({ message: "Erro ao buscar produto", error: error.message });
}
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, validity, photo } = req.body;

    if(name == "" || price == "" || description == "" || validity == "" || photo == "") {
      return res.status(400).send({ message: "Preencha todos os campos" });
    }

    if(!verifyUrl(photo)) {
      return res.status(400).send({ message: "URL da imagem inválida" });
    }
    
    const product = new Product(name, price, description, validity, photo);
    await productsRepository.createProduct(product);
    return res
      .status(201)
      .send({ message: "Produto criado com sucesso", product });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao cadastrar o produto", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, validity, photo } = req.body;
    const productById = await productsRepository.getProductById(id);
    
    if (!productById) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    if(!verifyUrl(photo)) {
      return res.status(400).send({ message: "URL da imagem inválida" });
    }

    if(name == "" || price == "" ||description == "" || validity == "" || photo == "") {
      return res.status(400).send({ message: "Preencha todos os campos" });
    }

    const updatedProduct = await productsRepository.updateProduct(
      id,
      name,
      price,
      description,
      validity,
      photo
    );
    return res
      .status(200)
      .send({ message: "Produto atualizado com sucesso", updatedProduct });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao atualizar produto", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsRepository.getProductById(id);
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }
    await productsRepository.deleteProduct(id);
    return res.status(200).send({ message: "Produto deletado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao tentar deletar o produto", error: error.message });
  }
};
