"use client";
import { CldImage, CldImageProps } from "next-cloudinary";
import React from "react";

function CCldImage(props: CldImageProps) {
  return <CldImage {...props} />;
}

export default CCldImage;
