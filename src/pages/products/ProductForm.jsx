import React, { useState } from 'react';

const ProductForm = (props) => {
  const [productData, setProductData] = useState({
    code: '',
    name: '',
    title: '',
    price: '',
    quantity: '',
    frame: '',
    wheel: '',
    color: '',
    category_id: '',
    brand_id: '',
    description: '',
    image: null
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProductData({ ...productData, [name]: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors || { general: "Đã xảy ra lỗi khi tạo sản phẩm." });
        return;
      }

      const data = await response.json();

      if (data.status === 0) {
        setErrors({ general: "Tạo thất bại" });
      } else {
        props.showModel(false);
        props.resetData();
        // notify(); // Hàm thông báo thành công (có thể tùy chỉnh theo nhu cầu)
      }
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      setErrors({ general: "Đã xảy ra lỗi khi tạo sản phẩm." });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.general && <div className="error">{errors.general}</div>}

      <input type="text" name="code" value={productData.code} onChange={handleChange} placeholder="Mã sản phẩm" />
      {errors.code && <div className="error">{errors.code}</div>}

      <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Tên sản phẩm" />
      {errors.name && <div className="error">{errors.name}</div>}

      <input type="text" name="title" value={productData.title} onChange={handleChange} placeholder="Tiêu đề sản phẩm" />
      {errors.title && <div className="error">{errors.title}</div>}

      <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Giá sản phẩm" />
      {errors.price && <div className="error">{errors.price}</div>}

      <input type="number" name="quantity" value={productData.quantity} onChange={handleChange} placeholder="Số lượng" />
      {errors.quantity && <div className="error">{errors.quantity}</div>}

      <select name="frame" value={productData.frame} onChange={handleChange}>
        <option value="">Chọn kích thước khung</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>
      {errors.frame && <div className="error">{errors.frame}</div>}

      <select name="wheel" value={productData.wheel} onChange={handleChange}>
        <option value="">Chọn kích thước bánh</option>
        <option value="24">24</option>
        <option value="26">26</option>
        <option value="28">28</option>
      </select>
      {errors.wheel && <div className="error">{errors.wheel}</div>}

      <select name="color" value={productData.color} onChange={handleChange}>
        <option value="">Chọn màu sắc</option>
        <option value="#FF0000">Red</option>
        <option value="#00FF00">Green</option>
        <option value="#0000FF">Blue</option>
        <option value="#FFFF00">Yellow</option>
        <option value="#000000">Black</option>
        <option value="#ffffff">White</option>
      </select>
      {errors.color && <div className="error">{errors.color}</div>}

      <input type="text" name="category_id" value={productData.category_id} onChange={handleChange} placeholder="ID danh mục" />
      {errors.category_id && <div className="error">{errors.category_id}</div>}

      <input type="text" name="brand_id" value={productData.brand_id} onChange={handleChange} placeholder="ID thương hiệu" />
      {errors.brand_id && <div className="error">{errors.brand_id}</div>}

      <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Mô tả"></textarea>

      <input type="file" name="image" onChange={handleChange} />
      {errors.image && <div className="error">{errors.image}</div>}

      <button type="submit">Tạo sản phẩm</button>
    </form>
  );
};

export default ProductForm;
