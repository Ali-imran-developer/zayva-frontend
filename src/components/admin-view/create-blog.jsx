import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, PlusCircle, Trash2, X } from "lucide-react";
import ImageUploader from "@/components/admin-view/blogs-imageUploader";
import { useBlogs } from "@/hooks/useBlogs";
import { blogSchema, blogValues } from "@/validators/blogs-schema";

const CreateBlogs = ({ initialData, onClose }) => {
  const { isAdding, handleAddBlogs, handleUpdateBlogs } = useBlogs();
  const initialValues = initialData || blogValues;

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try{
      console.log(values);
      let response;
      if (initialData) {
        response = await handleUpdateBlogs({ id: initialData?._id, formData: values });
      } else {
        response = await handleAddBlogs(values);
      }
      if(response?.success){
        resetForm();
        onClose();
      }
    }catch(error){
      console.log(error);
    }finally{
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl w-full h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">{initialData ? "Edit Blog" : "Create Blog"}</h1>

      <Formik enableReinitialize initialValues={initialValues} validationSchema={blogSchema} onSubmit={handleSubmit}>
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="space-y-6 mx-2">
            <div>
              <label className="block mb-1 font-medium">Heading</label>
              <Field name="heading" as={Input} placeholder="Enter heading" className={`w-full ${errors?.heading && touched?.heading ? "border border-red-600" : ""}`} />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <Field name="description" as={Input} placeholder="Enter description" className={`w-full ${errors?.heading && touched?.heading ? "border border-red-600" : ""}`} />
            </div>

            <FieldArray name="images">
              {({ push, remove }) => (
                <div>
                  <label className="block mb-2 font-medium">Images</label>

                  <ImageUploader
                    onUpload={(uploadedUrls) => {
                      uploadedUrls.forEach((url) => push(url));
                    }}
                  />

                  {values?.images?.length > 0 && (
                    <div className="flex gap-4 mt-4 flex-wrap">
                      {values.images.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`image-${index}`}
                            className="w-20 h-20 rounded-full object-cover border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute w-6 h-6 -top-0 -right-0 rounded-full"
                            onClick={() => remove(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <ErrorMessage name="images" component="p" className="text-sm  text-red-500" />
                </div>
              )}
            </FieldArray>

            <FieldArray name="tags">
              {({ push, remove }) => (
                <div>
                  <label className="block mb-2 font-medium">Tags</label>
                  {values?.tags?.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Field
                        name={`tags.${index}`}
                        as={Input}
                        placeholder="Tag"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => push("")}
                  >
                    <PlusCircle className="w-4 h-4 mr-1" /> Add Tag
                  </Button>
                  <ErrorMessage
                    name="tags"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
              )}
            </FieldArray>

            <FieldArray name="detail">
              {({ push, remove }) => (
                <div>
                  <label className="block mb-2 font-medium">Details</label>
                  {values.detail.map((detail, index) => (
                    <Card key={index} className="mb-4">
                      <CardContent className="space-y-4 p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Detail {index + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div>
                          <label className="block mb-1">Subheading</label>
                          <Field
                            name={`detail.${index}.subheading`}
                            as={Input}
                            placeholder="Enter subheading"
                          />
                          <ErrorMessage
                            name={`detail.${index}.subheading`}
                            component="p"
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div>
                          <label className="block mb-1">SubParagraph</label>
                          <Field
                            name={`detail.${index}.subParagraph`}
                            as={Input}
                            placeholder="Enter subParagraph"
                          />
                          <ErrorMessage
                            name={`detail.${index}.subParagraph`}
                            component="p"
                            className="text-sm text-red-500"
                          />
                        </div>

                        <FieldArray name={`detail.${index}.points`}>
                          {({ push, remove }) => (
                            <div>
                              <label className="block mb-2">Points</label>
                              {detail.points.map((_, pIndex) => (
                                <div key={pIndex} className="flex items-center gap-2 mb-2">
                                  <Field name={`detail.${index}.points.${pIndex}`} as={Input} placeholder="Enter point" className="flex-1" />
                                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(pIndex)}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button type="button" variant="outline" size="sm" onClick={() => push("")}>
                                <PlusCircle className="w-4 h-4 mr-1" /> Add Point
                              </Button>
                              <ErrorMessage name={`detail.${index}.points`} component="p" className="text-sm text-red-500" />
                            </div>
                          )}
                        </FieldArray>
                      </CardContent>
                    </Card>
                  ))}

                  <Button type="button" variant="outline" size="sm" onClick={() => push({ subheading: "", subParagraph: "", points: [""] })}>
                    <PlusCircle className="w-4 h-4 mr-1" /> Add Detail
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button type="submit" className="w-full" disabled={isAdding}>
              {isAdding ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : initialData ? (
                "Update Blog"
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlogs;