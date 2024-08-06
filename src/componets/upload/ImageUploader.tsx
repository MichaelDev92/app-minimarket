/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ImageUploader.tsx

import React, { useRef, useState } from "react";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
  onRemove: (file: File) => void;
  onClear: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  onRemove,
  onClear,
}) => {
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);
  const toast = useRef<Toast>(null);

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let _totalSize = totalSize;
    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });
    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    let _totalSize = 0;
    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });
    setTotalSize(_totalSize);
    toast.current?.show({
      severity: "info",
      summary: "Éxito",
      detail: "Archivo Subido",
    });
    onUpload(e.files);
  };

  const onTemplateRemove = (file: File, callback: any) => {
    setTotalSize(totalSize - file.size);
    callback();
    onRemove(file);
  };

  const onTemplateClear = () => {
    setTotalSize(0);
    onClear();
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formattedValue = fileUploadRef.current
      ? fileUploadRef.current.formatSize(totalSize)
      : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formattedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          />
        </div>
      </div>
    );
  };

  const itemTemplate = (file: File, props: ItemTemplateOptions) => (
    <div className="flex align-items-center flex-wrap">
      <div className="flex align-items-center" style={{ width: "40%" }}>
        <img
          alt={file.name}
          role="presentation"
          src={URL.createObjectURL(file)}
          width={100}
        />
        <span className="flex flex-column text-left ml-3">
          {file.name}
          <small>{new Date().toLocaleDateString()}</small>
        </span>
      </div>
      <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
      <Button
        type="button"
        icon="pi pi-times"
        className="p-button-outlined p-button-rounded p-button-danger ml-auto"
        onClick={() => onTemplateRemove(file, props.onRemove)}
      />
    </div>
  );

  const emptyTemplate = () => (
    <div className="flex align-items-center flex-column">
      <i
        className="pi pi-image mt-3 p-5"
        style={{
          fontSize: "5em",
          borderRadius: "50%",
          backgroundColor: "var(--surface-b)",
          color: "var(--surface-d)",
        }}
      />
      <span
        style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
        className="my-5"
      >
        Arrastra y suelta la imagen aquí
      </span>
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        url="/api/upload"
        multiple
        accept="image/*"
        maxFileSize={1000000}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={{
          icon: "pi pi-fw pi-images",
          iconOnly: true,
          className: "custom-choose-btn p-button-rounded p-button-outlined",
        }}
        uploadOptions={{
          icon: "pi pi-fw pi-cloud-upload",
          iconOnly: true,
          className:
            "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
        }}
        cancelOptions={{
          icon: "pi pi-fw pi-times",
          iconOnly: true,
          className:
            "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
        }}
      />
    </div>
  );
};

export default ImageUploader;
