"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ImageIcon, Dumbbell, Activity } from "lucide-react";
import { musclesData } from "@/lib/muscle-data";
import { getMuscleImageUrl, getMuscleImageAlt } from "@/lib/muscle-utils";
import { getMuscleExercises } from "@/lib/muscle-exercises";

interface EncyclopediaProps {
  onClose: () => void;
}

function MuscleCard({ muscle, index }: { muscle: typeof musclesData[0]; index: number }) {
  const muscleImageUrl = getMuscleImageUrl(muscle);
  const muscleImageAlt = getMuscleImageAlt(muscle);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Resetovat stav obrázku při změně svalu
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [muscle.id, muscle.name]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Obrázek */}
          <div className="relative w-full md:w-64 h-48 md:h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
            {muscleImageUrl && !imageError ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="animate-pulse text-gray-400 text-xs">Načítání...</div>
                  </div>
                )}
                <Image
                  src={muscleImageUrl}
                  alt={muscleImageAlt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 256px"
                  unoptimized
                  onLoad={() => {
                    setImageLoaded(true);
                  }}
                  onError={(e) => {
                    console.error('Chyba při načítání obrázku:', muscleImageUrl, 'pro sval:', muscle.name);
                    setImageError(true);
                    setImageLoaded(false);
                  }}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <ImageIcon className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-xs text-gray-400">
                  {muscle.name}
                </p>
                {muscleImageUrl && (
                  <p className="text-xs text-gray-300 mt-1">
                    {muscleImageUrl}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Informace */}
          <div className="flex-1 p-6 space-y-3">
            {/* Název */}
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Název</span>
              <p className="text-lg font-bold text-gray-900 mt-1">{muscle.name}</p>
            </div>

            {/* Latinský název */}
            {muscle.latinName && muscle.latinName !== '-' && muscle.latinName.trim() !== '' && (
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Latinský název</span>
                <p className="text-sm italic text-gray-700 mt-1">{muscle.latinName}</p>
              </div>
            )}

            {/* Začátek */}
            {muscle.origin && muscle.origin !== '-' && muscle.origin.trim() !== '' && (
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Začátek</span>
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{muscle.origin}</p>
              </div>
            )}

            {/* Úpon */}
            {muscle.insertion && muscle.insertion !== '-' && muscle.insertion.trim() !== '' && (
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Úpon</span>
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{muscle.insertion}</p>
              </div>
            )}

            {/* Funkce */}
            {muscle.function && muscle.function !== '-' && muscle.function.trim() !== '' && (
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Funkce</span>
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{muscle.function}</p>
              </div>
            )}
          </div>
        </div>

        {/* Cviky */}
        <div className="border-t bg-gray-50 p-6">
          {(() => {
            const exercises = getMuscleExercises(muscle.name);
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cviky na posílení */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Cviky na posílení
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exercises.strength.slice(0, 4).map((exercise, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-blue-600 flex-shrink-0">•</span>
                        <span>{exercise.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cviky na mobilitu */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Cviky na mobilitu
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exercises.mobility.slice(0, 2).map((exercise, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-green-600 flex-shrink-0">•</span>
                        <span>{exercise.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      </CardContent>
    </Card>
  );
}

export function Encyclopedia({ onClose }: EncyclopediaProps) {
  // Seskládat svaly podle skupin
  const groupedMuscles = musclesData.reduce((acc, muscle) => {
    const group = muscle.group || 'Ostatní';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(muscle);
    return acc;
  }, {} as Record<string, typeof musclesData>);

  // Seřadit skupiny abecedně
  const sortedGroups = Object.keys(groupedMuscles).sort();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold">Encyklopedie svalů</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {sortedGroups.map((group) => (
            <div key={group} className="mb-8">
              {/* Nadpis skupiny */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                {group}
              </h3>
              
              {/* Svaly v této skupině */}
              <div className="space-y-6">
                {groupedMuscles[group].map((muscle, index) => (
                  <MuscleCard key={muscle.id || index} muscle={muscle} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

