import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { categories } from "../../pages/products/types";
import { InputNumber } from "primereact/inputnumber";
import useProductContext from "../../provider/ProductContext";

export interface ProductFormData {
  nombre: string;
  valor: number;
  tipo_producto: number;
  caracteristicas: string;
  stock: number;
  subtotal: number;
  iva: number;
  estado: number;
  images: string;
  image1?: File;
  image2?: File;
  image3?: File;
}

const ProductForm: React.FC<{ onHide: () => void }> = ({ onHide }) => {
  const { addProduct, logData } = useProductContext(); // Usar el hook personalizado
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<ProductFormData | null>(
    null
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({ mode: "onBlur" });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    if (
      data.valor <= 0 ||
      data.stock < 0 ||
      data.subtotal < 0 ||
      data.iva < 0
    ) {
      alert("Valores numéricos deben ser mayores que cero.");
      return;
    }

    setLoading(true);

    try {
      // Convertir imágenes a base64 y concatenar
      const images: File[] = [data.image1, data.image2, data.image3].filter(
        (img): img is File => img !== undefined
      );

      const base64Images = await Promise.all(
        images.map((img) => convertToBase64(img))
      );
      base64Images.join("!");

      // Actualizar el objeto de datos con las imágenes concatenadas
      const updatedData: ProductFormData = {
        ...data,
        images: "",
      };

      await addProduct(updatedData);
      logData(updatedData); // Registrar la data agregada
      setSubmittedData(updatedData);
      reset();
      onHide();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      header="Agregar Producto"
      visible={true}
      onHide={onHide}
      footer={<Button label="Cerrar" onClick={onHide} />}
    >
      {loading && <p>Guardando data...</p>}
      {submittedData && (
        <div>
          <h3>Datos guardados:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        {/* Campos del formulario */}
        <div className="p-field flex items-center flex-col">
          <label htmlFor="nombre">Nombre</label>
          <Controller
            name="nombre"
            control={control}
            rules={{ required: "El nombre es obligatorio." }}
            render={({ field }) => (
              <InputText
                id="nombre"
                {...field}
                className="border-2 solid border-blue-200"
              />
            )}
          />
          {errors.nombre && (
            <small className="p-error">{errors.nombre.message}</small>
          )}
        </div>

        <div className="p-field  flex items-center flex-col">
          <label htmlFor="valor">Valor</label>
          <Controller
            name="valor"
            control={control}
            rules={{
              required: "El valor es obligatorio.",
              min: { value: 0, message: "El valor debe ser mayor que cero." },
            }}
            render={({ field }) => (
              <InputNumber
                id="valor"
                value={field.value || 0}
                onValueChange={(e) => field.onChange(e.value)}
                min={0}
                className="border-2 solid border-blue-200"
              />
            )}
          />
          {errors.valor && (
            <small className="p-error">{errors.valor.message}</small>
          )}
        </div>

        <div className="p-field mb-5  flex items-center flex-col">
          <label htmlFor="tipo_producto">Tipo de Producto</label>
          <Controller
            name="tipo_producto"
            control={control}
            rules={{ required: "El tipo de producto es obligatorio." }}
            render={({ field }) => (
              <Dropdown
                id="tipo_producto"
                value={field.value} // Asegúrate de que value esté en formato número
                onChange={(e) => field.onChange(e.value)} // Guardar solo el ID
                options={categories}
                optionLabel="descripcion"
                optionValue="id" // Asignar el ID como valor
                placeholder="Selecciona un tipo"
                className="border-2 solid border-blue-200"
              />
            )}
          />
          {errors.tipo_producto && (
            <small className="p-error">{errors.tipo_producto.message}</small>
          )}
        </div>

        <div className="p-field  flex items-center flex-col">
          <label htmlFor="image1">Imagen 1</label>
          <Controller
            name="image1"
            control={control}
            rules={{ required: "La imagen 1 es obligatoria." }}
            render={({ field }) => (
              <input
                id="image1"
                type="file"
                accept="image/*"
                className="border-2 solid border-blue-200"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    field.onChange(e.target.files[0]);
                  }
                }}
              />
            )}
          />
          {errors.image1 && (
            <small className="p-error">{errors.image1.message}</small>
          )}
        </div>

        <div className="p-field  flex items-center flex-col">
          <label htmlFor="image2">Imagen 2</label>
          <Controller
            name="image2"
            control={control}
            rules={{ required: "La imagen 2 es obligatoria." }}
            render={({ field }) => (
              <input
                id="image2"
                className="border-2 solid border-blue-200"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    field.onChange(e.target.files[0]);
                  }
                }}
              />
            )}
          />
          {errors.image2 && (
            <small className="p-error">{errors.image2.message}</small>
          )}
        </div>

        <div className="p-field  flex items-center flex-col">
          <label htmlFor="image3">Imagen 3</label>
          <Controller
            name="image3"
            control={control}
            rules={{ required: "La imagen 3 es obligatoria." }}
            render={({ field }) => (
              <input
                id="image3"
                type="file"
                className="border-2 solid border-blue-200"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    field.onChange(e.target.files[0]);
                  }
                }}
              />
            )}
          />
          {errors.image3 && (
            <small className="p-error">{errors.image3.message}</small>
          )}
        </div>

        <div className="p-field mt-5  flex items-center flex-col">
          <label htmlFor="caracteristicas">Características</label>
          <Controller
            name="caracteristicas"
            control={control}
            rules={{ required: "Las características son obligatorias." }}
            render={({ field }) => (
              <InputText
                id="caracteristicas"
                {...field}
                className="border-2 solid border-blue-200"
              />
            )}
          />
          {errors.caracteristicas && (
            <small className="p-error">{errors.caracteristicas.message}</small>
          )}
        </div>

        <div className="p-field  flex items-center flex-col">
          <label htmlFor="stock">Stock</label>
          <Controller
            name="stock"
            control={control}
            rules={{
              required: "El stock es obligatorio.",
              min: {
                value: 0,
                message: "El stock debe ser mayor o igual a cero.",
              },
            }}
            render={({ field }) => (
              <InputNumber
                id="stock"
                className="border-2 solid border-blue-200"
                value={field.value || 0}
                onValueChange={(e) => field.onChange(e.value)}
                min={0}
              />
            )}
          />
          {errors.stock && (
            <small className="p-error">{errors.stock.message}</small>
          )}
        </div>

        <div className="p-field  flex items-center flex-col">
          <label htmlFor="subtotal">Subtotal</label>
          <Controller
            name="subtotal"
            control={control}
            rules={{
              required: "El subtotal es obligatorio.",
              min: {
                value: 0,
                message: "El subtotal debe ser mayor o igual a cero.",
              },
            }}
            render={({ field }) => (
              <InputNumber
                id="subtotal"
                className="border-2 solid border-blue-200"
                value={field.value || 0}
                onValueChange={(e) => field.onChange(e.value)}
                min={0}
              />
            )}
          />
          {errors.subtotal && (
            <small className="p-error">{errors.subtotal.message}</small>
          )}
        </div>

        <div className="p-field  flex items-center flex-col">
          <label htmlFor="iva">IVA</label>
          <Controller
            name="iva"
            control={control}
            rules={{
              required: "El IVA es obligatorio.",
              min: {
                value: 0,
                message: "El IVA debe ser mayor o igual a cero.",
              },
            }}
            render={({ field }) => (
              <InputNumber
                id="iva"
                value={field.value || 0}
                className="border-2 solid border-blue-200"
                onValueChange={(e) => field.onChange(e.value)}
                min={0}
              />
            )}
          />
          {errors.iva && (
            <small className="p-error">{errors.iva.message}</small>
          )}
        </div>

        <div className="p-field  flex items-center flex-col">
          <label htmlFor="estado">Estado</label>
          <Controller
            name="estado"
            control={control}
            rules={{ required: "El estado es obligatorio." }}
            render={({ field }) => (
              <InputNumber
                id="estado"
                value={field.value || 0}
                onValueChange={(e) => field.onChange(e.value)}
                min={0}
                className="border-2 solid border-blue-200"
              />
            )}
          />
          {errors.estado && (
            <small className="p-error">{errors.estado.message}</small>
          )}
        </div>

        <Button
          type="submit"
          label="Guardar"
          className=" mt-6 hover:bg-blue-200"
        />
      </form>
    </Dialog>
  );
};

export default ProductForm;
