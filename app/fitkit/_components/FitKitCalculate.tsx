"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const FitKitCalculate = ({
  secondaryColor,
  primaryColor,
}: {
  secondaryColor: string;
  primaryColor: string;
}) => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [sex, setSex] = useState<string>("male");
  const [activity, setActivity] = useState<string>("1.2");
  const [meaning, setMeaning] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);

  const computeBMI = () => {
    const w = parseFloat(weight);
    const hCms = parseFloat(height);

    if (!w || !hCms || hCms <= 0) {
      setBmi(null);
      setMeaning("Enter valid weight & height");
      return;
    }

    const h = hCms / 100; // meters
    const raw = w / (h * h);
    const rounded = Math.round(raw * 10) / 10;
    setBmi(rounded);

    // Interpretation
    let interp = "";
    if (rounded < 18.5) interp = "Underweight";
    else if (rounded < 25) interp = "Normal weight";
    else if (rounded < 30) interp = "Overweight";
    else interp = "Obese";

    // Add activity hint (simple)
    const a = parseFloat(activity) || 1.0;
    let activityHint = "";
    if (a >= 1.7) activityHint = "High activity — caloric needs higher.";
    else if (a >= 1.4) activityHint = "Moderate activity — keep balanced diet.";
    else activityHint = "Low activity — consider light exercise.";

    // Include sex/age hints optionally
    let extra = "";
    if (age) {
      const ag = parseInt(age, 10);
      if (!Number.isNaN(ag)) {
        if (ag < 18) extra = " (under 18 - consult paediatric guidance)";
        else if (ag >= 65) extra = " (older adult - consult physician)";
      }
    }

    setMeaning(`${interp}.${extra} ${activityHint}`);
  };

  return (
    <section
      className="bg-[var(--pri)] font-kanit h-[85vh] z-0 -mt-1 md:-mt-[160px] cal-clip [clip-path:inherit]"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20 flex flex-col items-center justify-center h-full">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
          <span className="font-medium text-lg text-[var(--sec)] uppercase">
            Body Mass Index
          </span>
          <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
        </div>
        <h3 className="font-semibold text-3xl md:text-5xl text-white text-center">
          Calculate Your BMI Now
        </h3>

        <div className="grid md:grid-cols-12 w-full gap-4 md:gap-6 mt-6">
          <Input
            placeholder="Weight / KG"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border col-span-12 md:col-span-3 border-[#2F343B] rounded-none h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo 
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [appearance:textfield]"
          />
          <Input
            placeholder="Height / CM"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border col-span-12 md:col-span-3 border-[#2F343B] rounded-none h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [appearance:textfield]"
          />
          <Input
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border col-span-12 md:col-span-3 border-[#2F343B] rounded-none h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [appearance:textfield]"
          />
          <Select value={sex} onValueChange={(e) => setSex(e)}>
            <SelectTrigger className="cursor-pointer col-span-12 md:col-span-3 w-full border border-[#2F343B] rounded-none data-[size=default]:h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo">
              <SelectValue placeholder="Sex" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem
                className="cursor-pointer border-[#2F343B] bg-transparent"
                value="male"
              >
                Male
              </SelectItem>
              <SelectItem className="cursor-pointer" value="female">
                Female
              </SelectItem>
              <SelectItem className="cursor-pointer" value="other">
                Other
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="BMI Activity Factor"
            onChange={(e) => setActivity(e.target.value)}
            type="number"
            value={activity}
            className="w-full border col-span-12 border-[#2F343B] md:col-span-4 rounded-none h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [appearance:textfield]"
          />

          {/* This Means: show interpretation text (readOnly to avoid user typing numeric) */}
          <Input
            placeholder="This Means"
            type="text"
            value={
              // If BMI present, show "BMI: X — Interpretation" else show meaning text or placeholder.
              bmi !== null ? `BMI: ${bmi} — ${meaning}` : meaning
            }
            readOnly
            disabled
            className="w-full cursor-not-allowed border col-span-12 border-[#2F343B] md:col-span-4 rounded-none h-12 placeholder:text-[#6B7586] text-white md:text-lg px-[30px] font-archivo"
          />
          <button
            onClick={computeBMI}
            aria-label="Calculate Now"
            className="bg-[var(--sec)] h-12 col-span-12 cursor-pointer hover:bg-[var(--sec)]/70 text-white font-archivo font-bold text-[14px] md:col-span-4 uppercase"
          >
            Calculate Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FitKitCalculate;
