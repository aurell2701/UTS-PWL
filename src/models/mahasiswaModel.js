import prisma from "../config/prisma.js";

// GET ALL
export const getAll = async () => {
  return await prisma.mahasiswa.findMany({
    orderBy: { id: "asc" },
  });
};

// GET BY ID
export const getById = async (id) => {
  return await prisma.mahasiswa.findUnique({
    where: { id: parseInt(id) },
  });
};

// CREATE
export const create = async (data) => {
  return await prisma.mahasiswa.create({
    data: {
      nama: data.nama,
      nim: data.nim,
    },
  });
};

// UPDATE
export const update = async (id, data) => {
  return await prisma.mahasiswa.update({
    where: { id: parseInt(id) },
    data: {
      nama: data.nama,
      nim: data.nim,
    },
  });
};

// DELETE
export const remove = async (id) => {
  return await prisma.mahasiswa.delete({
    where: { id: parseInt(id) },
  });
};