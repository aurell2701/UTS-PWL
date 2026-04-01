import { render } from "../config/viewEngine";
import * as model from "../models/mahasiswaModel";

// LIST
export const index = async (c) => {
  // Gunakan await agar data mahasiswa terambil sempurna sebelum dirender
  const data = await model.getAll(); 
  const success = c.req.query("success");
  const error = c.req.query("error");
  
  return c.html(
    await render("mahasiswa/index", {
      title: "Data Mahasiswa",
      mahasiswa: data || [], // Pastikan kirim array kosong jika data null
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
  
  await model.create({
    nama: body.nama,
    nim: body.nim,
  });
  
  return c.redirect("/mahasiswa?success=Data berhasil ditambahkan");
};

// FORM EDIT
export const editForm = async (c) => {
  const id = c.req.param("id");
  
  // Konversi id ke Number karena di model id: 1 (number), sedangkan di URL "1" (string)
  const data = await model.getById(Number(id)); 
  
  console.log("Mencari ID:", id, "| Data ditemukan:", data);

  if (!data) {
    return c.redirect("/mahasiswa?error=Data tidak ditemukan");
  }
  
  return c.html(
    await render("mahasiswa/edit", {
      title: "Edit Mahasiswa",
      mhs: data, // Nama variabel 'mhs' harus sama dengan di edit.ejs
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
  
  // Pastikan ID dikonversi ke Number agar cocok dengan array di model
  const isUpdated = await model.update(Number(id), {
    nama: body.nama,
    nim: body.nim,
  });
  
  if (isUpdated === null) {
    return c.redirect("/mahasiswa?error=Gagal mengupdate data");
  }
  
  return c.redirect("/mahasiswa?success=Data berhasil diupdate");
};

// DELETE
export const destroy = async (c) => {
  const id = c.req.param("id");
  await model.remove(Number(id));
  
  return c.redirect("/mahasiswa?success=Data berhasil dihapus");
};