import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { GoUpload } from "react-icons/go";
import { toast } from "sonner";
import { AlertDialogContent } from "./alert-dialog";
import { Button } from "./button";

const Dropzone = ({ className, setOpen }) => {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (files.length > 0) {
        toast.error("You can only upload one image at a time.");
        return;
      }

      if (acceptedFiles.length > 0) {
        const [firstFile] = acceptedFiles;
        setFiles((previousFiles) => [
          ...previousFiles,
          Object.assign(firstFile, { preview: URL.createObjectURL(firstFile) }),
        ]);
      }

      if (rejectedFiles.length > 0) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
    maxSize: 1024 * 1024,
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files?.length) return;
    toast.info("Kire hoye gese naki???");
  };

  return (
    <AlertDialogContent>
      <form onSubmit={handleSubmit}>
        <div
          {...getRootProps({
            className: className,
          })}
        >
          <input {...getInputProps()} />
          <div
            className={`mt-10 border-2 border-dashed rounded-lg h-[200px] w-full flex justify-center items-center ${
              isDragActive
                ? "border-green-700 bg-green-600/10"
                : "border-foreground"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <GoUpload
                className={`w-10 h-10 ${isDragActive && "text-green-600"}`}
              />
              {isDragActive ? (
                <p className="text-green-600 capitalize">Drop the file here</p>
              ) : (
                <p className="font-normal capitalize text-sm text-center">
                  Drag & drop here or click to select file
                </p>
              )}
            </div>
          </div>
        </div>

        {(files.length > 0 || rejected.length > 0) && (
          <section className="mt-5">
            <div className="flex justify-between items-center">
              <p className="title text-xl font-semibold text-primary">
                Preview
              </p>
              <Button variant="outline" onClick={removeAll}>
                Remove Image
              </Button>
            </div>

            {!rejected.length > 0 && (
              <>
                <h3 className="title text-lg font-normal mt-4 border-b border-gray-light pb-1">
                  Accepted Images
                </h3>
                <ul className="my-5">
                  {files.map((file) => (
                    <li key={file.name}>
                      <div className="relative rounded-lg shadow-lg flex flex-col items-center">
                        <Image
                          src={file.preview}
                          alt={file.name}
                          width={100}
                          height={100}
                          onLoad={() => {
                            URL.revokeObjectURL(file.preview);
                          }}
                          className="h-[300px] w-full object-contain rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-white/70 dark:bg-black/70 z-10 flex justify-center items-center">
                          <Image
                            src={file.preview}
                            alt={file.name}
                            width={100}
                            height={100}
                            onLoad={() => {
                              URL.revokeObjectURL(file.preview);
                            }}
                            className="w-[300px] h-[300px] rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <p className="mt-3 text-sm font-medium text-center">
                        {file.name}
                      </p>
                    </li>
                  ))}
                </ul>

                <Button type="submit" className="w-full">
                  Upload
                </Button>
              </>
            )}

            {rejected.length > 0 && (
              <>
                <h3 className="title text-lg font-normal mt-10 border-b border-gray-light pb-1 text-red">
                  Rejected Images
                </h3>
                <ul className="mt-2 flex flex-col">
                  {rejected.map(({ file, errors }) => (
                    <li key={file.name}>
                      <div>
                        <p className="text-neutral-500 text-sm font-medium">
                          {file.name}
                        </p>
                        <ul className="text-[12px] text-red-400">
                          {errors.map((error) => (
                            <li key={error.code}>{error.message}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}
      </form>
      <Cross2Icon
        onClick={() => setOpen(false)}
        className="h-5 w-5 top-4 right-4 absolute cursor-pointer text-zinc-500 hover:text-foreground"
      />
    </AlertDialogContent>
  );
};

export default Dropzone;
