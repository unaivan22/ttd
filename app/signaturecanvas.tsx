"use client"

import React, { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

import { Download, Eraser, Undo, Image, FileImage, BookImage } from "lucide-react"

import { ModeToggle } from '@/components/mode-toggle';


interface SignatureCanvasProps {
  width: number;
  height: number;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [maxWidthThickness, setMaxWidthThickness] = useState<number>(2);

  useEffect(() => {
    if (canvasRef.current && !signaturePadRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        minWidth: 1,
        maxWidth: maxWidthThickness,
        penColor: 'black',
        backgroundColor: 'white',
      });
    }
  }, [maxWidthThickness]); // Add maxWidth to dependencies

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

      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = `signature.${format}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleSetMaxWidthThickness = (value: number) => {
    setMaxWidthThickness(value);
  };

  return (
    <div>
      <Card className="w-[350px] 2xl:w-[550px] xl:w-[550px]">
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            Signature
            <ModeToggle />
          </CardTitle>
          <CardDescription className='-translate-y-2'>Draw your signature below.</CardDescription>
          <div className='flex items-center gap-x-4 py-4'>
            <Label>Thickness</Label>
            <input
              type="range"
              max={5}
              min={1}
              step={1}
              className={cn("w-[100%] accent-zinc-900 dark:accent-zinc-100")}
              onChange={(e) => handleSetMaxWidthThickness(parseFloat((e.target as HTMLInputElement).value))}
            />
            <Label>{maxWidthThickness}</Label>
          </div>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Download</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Download</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => saveSignature('png')}>
                    <Image className="mr-2 h-4 w-4" />
                    <span>Png</span>
                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => saveSignature('svg')}>
                    <FileImage className="mr-2 h-4 w-4" />
                    <span>Svg</span>
                    {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => saveSignature('jpg')}>
                    <BookImage className="mr-2 h-4 w-4" />
                    <span>Jpg</span>
                    {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
