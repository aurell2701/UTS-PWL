import { render } from "../config/viewEngine.js";
import * as model from "../models/mahasiswaModel.js";

// LIST
export const index = async (c) => {
  const data = await model.getAll();
  const success = c.req.query("success");
  const error = c.req.query("error");
  return c.html(
    await render("mahasiswa/index", {
      title: "Data Mahasiswa",
      mahasiswa: data,
      success,
      error,
    }, c)
  );
};

// FORM CREATE
export const createForm = async (c) => {
  return c.html(
    await render("mahasiswa/create", {
      title: "Tambah Mahasiswa",
    }, c)
  );
};

// STORE
export const store = async (c) => {
  const body = await c.req.parseBody();
  if (!body.nama || !body.nim) {
    return c.redirect("/mahasiswa/create?error=Semua field wajib diisi");
  }
  try {
    await model.create({ nama: body.nama, nim: body.nim });
    return c.redirect("/mahasiswa?success=Data berhasil ditambahkan");
  } catch (e) {
    if (e.code === "P2002") {
      return c.redirect("/mahasiswa/create?error=NIM sudah terdaftar");
    }
    return c.redirect("/mahasiswa/create?error=Gagal menyimpan data");
  }
};

// FORM EDIT
export const editForm = async (c) => {
  const id = c.req.param("id");
  const data = await model.getById(id);
  if (!data) {
    return c.redirect("/mahasiswa?error=Data tidak ditemukan");
  }
  return c.html(
    await render("mahasiswa/edit", {
      title: "Edit Mahasiswa",
      mhs: data,
    }, c)
  );
};

// UPDATE
export const updateData = async (c) => {
  const id = c.req.param("id");
  const body = await c.req.parseBody();
  if (!body.nama || !body.nim) {
    return c.redirect(`/mahasiswa/edit/${id}?error=Field tidak boleh kosong`);
  }
  try {
    await model.update(id, { nama: body.nama, nim: body.nim });
    return c.redirect("/mahasiswa?success=Data berhasil diupdate");
  } catch (e) {
    if (e.code === "P2002") {
      return c.redirect(`/mahasiswa/edit/${id}?error=NIM sudah digunakan`);
    }
    return c.redirect(`/mahasiswa/edit/${id}?error=Gagal mengupdate data`);
  }
};

// DELETE
export const destroy = async (c) => {
  const id = c.req.param("id");
  try {
    await model.remove(id);
    return c.redirect("/mahasiswa?success=Data berhasil dihapus");
  } catch (e) {
    return c.redirect("/mahasiswa?error=Gagal menghapus data");
  }
};
