const Item = require("../services/Item.Service");

class ItemController {
  async getItem(req, res) {
    const search = req.query.search ? req.query.search : "";

    let query = {},
      total;
    try {
      query = {
        $or: [
          {
            namaBarang: { $regex: search, $options: "i" },
          },
        //   {
        //     hargaBeli: { $regex: search, $options: "i" },
        //   },
        //   {
        //     hargaJual: { $regex: search, $options: "i" },
        //   },
        //   {
        //     stok: { $regex: search, $options: "i" },
        //   },
        ],
      };

      let data = await Item.getItem(query);

      total = data.length;

      res.status(200).json({
        code: 200,
        message: "Berhasil Mendapatkan Item",
        data,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: 500,
        messaage: "Server Sedang Sibuk",
      });
    }
  }

  async getItemDetail(req, res) {
    let query = {};
    try {
      query = {
        $or: [
          {
            _id: req.params.id,
          },
        ],
      };

      let data = await Item.getItemDetailByQuery(query);

      res.status(200).json({
        code: 200,
        message: "Berhasil Mendapatkan Detail Item",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: 500,
        messaage: "Server Sedang Sibuk",
      });
    }
  }

  async create(req, res) {
    const { namaBarang } = req.body;

    if (!namaBarang) {
      return res.status(400).json({
        code: 400,
        message: "Nama Dibutuhkan",
      });
    }

    try {
      const checkNamaBarang = await Item.getItemDetailByQuery({
        namaBarang,
      });

      if (checkNamaBarang) {
        return res.status(400).json({
          code: 400,
          message: "Nama Barang Sudah Terdaftar",
        });
      }

      const result = await Item.addItem(req.body);

      res.status(200).json({
        code: 200,
        message: "Berhasil Menambahkan Item",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: 500,
        messaage: "Server Sedang Sibuk",
      });
    }
  }

  async update(req, res) {
    const { namaBarang } = req.body;

    if (!namaBarang) {
      return res.status(400).json({
        code: 400,
        message: "Nama Barang Dibutuhkan",
      });
    }

    try {
      const currentData = await Item.getItemDetailByQuery({
        _id: req.params.id,
      });

      if (!currentData) {
        return res.status(400).json({
          code: 400,
          message: "Data Tidak Ditemukan Database",
        });
      }

      const checkNamaBarang = await Item.getItemDetailByQuery({
        $and: [
          {
            namaBarang: namaBarang,
          },
          {
            namaBarang: { $ne: currentData.namaBarang },
          },
        ],
      });

      if (checkNamaBarang) {
        return res.status(400).json({
          code: 400,
          message: "Nama Barang Sudah Terdaftar",
        });
      }

      const result = await Item.updateItem(req.body, req.params.id);

      res.status(200).json({
        code: 200,
        message: "Berhasil Mengupdate Item",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: 500,
        messaage: "Server Sedang Sibuk",
      });
    }
  }

  async delete(req, res) {
    try {
      const currentData = await Item.getItemDetailByQuery({
        _id: req.params.id,
      });

      if (!currentData) {
        return res.status(400).json({
          code: 400,
          message: "Data Tidak Ditemukan Database",
        });
      }
      const result = await Item.deleteItem(req.params.id);

      res.status(200).json({
        code: 200,
        message: "Berhasil Menghapus Item",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: 500,
        messaage: "Server Sedang Sibuk",
      });
    }
  }
}

module.exports = new ItemController();
