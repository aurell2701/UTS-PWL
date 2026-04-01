// src/controllers/homeController.ts
import { render } from "../config/viewEngine";
import * as mhsModel from "../models/mahasiswaModel";

export const home = async (c) => {
  try {
    // Ambil data dulu
    const data = await mhsModel.getAll() || []; 

    const html = await render("home", {
      title: "Dashboard Bun MVC",
      message: "Hello dari Bun + Tailwind 🚀",
      mahasiswa: data, // Tambahkan ini agar tabel tidak kosong
      totalMhs: data.length
    }, c); // PASTIKAN ADA 'c' DI SINI
    
    return c.html(html);
  } catch (error) {
    console.error("Error di HomeController:", error);
    return c.text("Gagal memuat dashboard: " + error.message, 500);
  }
};