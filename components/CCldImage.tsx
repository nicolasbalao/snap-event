"use client";
import { CldImage } from "next-cloudinary";
import React, { ComponentPropsWithoutRef } from "react";

function CCldImage(props: any) {
  return (
    <>
    <CldImage {...props} />
    </>
  );
}

export default CCldImage;
