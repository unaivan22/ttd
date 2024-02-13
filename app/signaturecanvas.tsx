"use client"

import React, { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Download, Eraser, Undo } from "lucide-react"



interface SignatureCanvasProps {
  width: number;
  height: number;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  // const [savedSignature, setSavedSignature] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        minWidth: 1,
        maxWidth: 3,
        penColor: 'black',
        backgroundColor: 'white',
      });
    }
  }, []);

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      // setSavedSignature(null);
    }
  };

  const undoSignature = () => {
    if (signaturePadRef.current) {
      const data = signaturePadRef.current.toData();
      if (data) {
        data.pop(); // Remove the last stroke
        signaturePadRef.current.fromData(data);
      }
    }
  };

  const saveSignature = (format: 'png' | 'svg' | 'jpg') => {
    if (signaturePadRef.current) {
      let dataURL;
      switch (format) {
        case 'png':
          dataURL = signaturePadRef.current.toDataURL();
          break;
        case 'svg':
          dataURL = signaturePadRef.current.toDataURL('image/svg+xml');
          break;
        case 'jpg':
          dataURL = signaturePadRef.current.toDataURL('image/jpeg', 1.0);
          break;
        default:
          throw new Error('Invalid format');
      }

      // Create temporary anchor element to trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = `signature.${format}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Set saved signature state
      // setSavedSignature(dataURL);
    }
  };

  return (
    <div>
      <Card className="w-[350px] 2xl:w-[550px] xl:w-[550px]">
        <CardHeader>
          <CardTitle>Draw Signature</CardTitle>
          <CardDescription>Draw your signatur bellow.</CardDescription>
        </CardHeader>
        <CardContent>
          <canvas ref={canvasRef} width={width} height={height}></canvas>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={clearSignature}>
            <Eraser className="mr-2 h-4 w-4" /> Clear
          </Button>

          <div className='space-x-2 2xl:flex xl:flex hidden'>
            <Button variant="outline" onClick={() => saveSignature('png')}>
              <Download className="mr-2 h-4 w-4" /> PNG
            </Button>
            <Button variant="outline" onClick={() => saveSignature('svg')}>
              <Download className="mr-2 h-4 w-4" /> SVG
            </Button>
            <Button variant="outline" onClick={() => saveSignature('jpg')}>
              <Download className="mr-2 h-4 w-4" /> JPG
            </Button>
          </div>

          <div className='2xl:hidden xl:hidden sm:block xs:block'>
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Download as" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Download</SelectLabel>
                  <SelectItem value="png" onClick={() => saveSignature('png')}>png</SelectItem>
                  <SelectItem value="svg" onClick={() => saveSignature('svg')}>svg</SelectItem>
                  <SelectItem value="jpg" onClick={() => saveSignature('jpg')}>jpg</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


          <Button variant="outline" onClick={undoSignature}>
            <Undo className="mr-2 h-4 w-4" /> Undo
          </Button>
        </CardFooter>
      </Card>
      {/* {savedSignature && (
        <div>
          <h2>Saved Signature:</h2>
          <img src={savedSignature} alt="Signature" />
        </div>
      )} */}
    </div>
  );
};

export default SignatureCanvas;
