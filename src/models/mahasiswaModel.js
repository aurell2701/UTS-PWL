// Gunakan let, tapi jangan ganti referensi array-nya secara total jika memungkinkan
let mahasiswa = [
  { id: 1, nama: "Budi", nim: "12345" },
];

export const getAll = () => mahasiswa;

export const getById = (id) => {
  // Pastikan perbandingan tipe data aman (==)
  return mahasiswa.find((m) => m.id == id);
};

export const create = (data) => {
  const newData = {
    id: Date.now(), // ID unik berbasis waktu
    ...data,
  };
  mahasiswa.push(newData);
  return newData;
};

export const update = (id, data) => {
  const index = mahasiswa.findIndex((m) => m.id == id);
  if (index !== -1) {
    // Update isi array tanpa mengganti variabel 'mahasiswa'
    mahasiswa[index] = { ...mahasiswa[index], ...data };
    return mahasiswa[index];
  }
  return null;
};

export const remove = (id) => {
  const index = mahasiswa.findIndex((m) => m.id == id);
  if (index !== -1) {
    mahasiswa.splice(index, 1); // Menghapus elemen langsung dari array asli
    return true;
  }
  return false;
};