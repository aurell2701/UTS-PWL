import ejs from "ejs";
import { readFile } from "fs/promises";
import path from "path";

export const render = async (view, data = {}, c = null) => {
  // Gunakan path.resolve agar lebih stabil mencari file
  const viewPath = path.resolve(`./src/views/${view}.ejs`);
  const layoutPath = path.resolve(`./src/views/layout.ejs`);

  const viewTemplate = await readFile(viewPath, "utf-8");
  
  // Render konten utama (misal: edit.ejs)
  // Tambahkan { filename: viewPath } agar EJS tahu konteks filenya
  const content = ejs.render(viewTemplate, data, { filename: viewPath });

  const layoutTemplate = await readFile(layoutPath, "utf-8");

  // Gabungkan ke layout
  return ejs.render(layoutTemplate, {
    ...data,
    body: content,
    currentPath: c?.req?.path || "",
  }, { filename: layoutPath });
};