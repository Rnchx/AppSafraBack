import Category from "../models/categorys/Category.js"
import CategorysRepository from "../models/categorys/CategorysRepository.js"

const categorysRepository = new CategorysRepository();

export const getCategorys = async (req, res) => {
  try {
    const categorys = await categorysRepository.getCategorys();
    if (!categorys || categorys.length === 0) {
      return res.status(404).send({ message: "Não há categorias cadastradas" });
    }
    return res.status(200).send({ totalCategorys: categorys.length, categorys });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao tentar buscar categorias", error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categorysRepository.getCategoryById(id);
    if (!category) {
      return res.status(404).send({ message: "Categoria não encontrada" });
    }
    return res.status(200).send({ message: "Categoria encontrada", category });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao buscar produto", error: error.message });
  }
};

export const getCategoryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const category = await categorysRepository.getCategoryByName(name);

    if (!category) {
      return res.status(404).send({ message: "Categoria não encontrada" });
    }

    return res.status(200).send({ message: "Categoria encontrado", category });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao buscar categorias", error: error.message });
  }
};

export const filterProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await categorysRepository.filterProductByCategory(category);

    if (!products) {
      return res.status(404).send({ message: "Produtos não encontrados" });
    }

    return res.status(200).send({ message: "Produtos encontrados", products });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao buscar produtos filtrados", error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (name == "") {
      return res.status(400).send({ message: "Preencha todos os campos" });
    }

    const category = new Category(name);
    await categorysRepository.createCategory(category);
    return res
      .status(201)
      .send({ message: "Categoria criada com sucesso", category });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao cadastrar a categoria", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const categoryById = await categorysRepository.getCategoryById(id);

    if (!categoryById) {
      return res.status(404).send({ message: "Categoria não encontrada" });
    }

    if (name == "") {
      return res.status(400).send({ message: "Preencha todos os campos" });
    }

    const updatedCategory = await categorysRepository.updateCategory(
      id,
      name
    );
    return res
      .status(200)
      .send({ message: "Categoria atualizada com sucesso", updatedCategory });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao atualizar categoria", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categorysRepository.getCategoryById(id);
    if (!category) {
      return res.status(404).send({ message: "Categoria não encontrada" });
    }
    await categorysRepository.deleteCategory(id);
    return res.status(200).send({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao tentar deletar a categoria", error: error.message });
  }
};
