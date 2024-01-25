"use client";
import { useEffect, useState } from "react";
import {
  UPDATE_YEAR_COLOR,
  CREATE_YEAR_COLOR,
  DELETE_YEAR_COLOR,
} from "@/lib/mutations/year-color";
import { GET_YEAR_COLORS } from "@/lib/queries/year-color";
import { useMutation, useQuery } from "@apollo/client";

const YearColors = () => {
  const { data, loading, error } = useQuery(GET_YEAR_COLORS);
  const [yearColors, setYearColors] = useState<Year_colors>([]);
  const [updateYearColor] = useMutation(UPDATE_YEAR_COLOR);
  const [createYearColor] = useMutation(CREATE_YEAR_COLOR);
  const [deleteYearColor] = useMutation(DELETE_YEAR_COLOR);
  const [newYearColor, setNewYearColor] = useState<Year_color>({
    id: "",
    attributes: {
      year: 0,
      color: "",
    },
  });

  useEffect(() => {
    if (data) {
      setYearColors(data.yearColors?.data);
    }
  }, [data]);

  const handleChange = (e: any, id: string, field: string) => {
    const newYearColors = yearColors.map((year_color: Year_color) => {
      if (year_color.id === id) {
        return {
          ...year_color,
          attributes: {
            ...year_color.attributes,
            [field]:
              field === "year" ? parseInt(e.target.value) : e.target.value,
          },
        };
      }
      return year_color;
    });
    setYearColors(newYearColors);
  };

  const handleUpdate = () => {
    yearColors.forEach((year_color: Year_color) => {
      updateYearColor({
        variables: {
          id: year_color.id,
          year: year_color.attributes.year,
          color: year_color.attributes.color,
        },
      });
    });
  };

  const handleNewChange = (e: any, field: string) => {
    setNewYearColor({
      ...newYearColor,
      attributes: {
        ...newYearColor.attributes,
        [field]: field === "year" ? parseInt(e.target.value) : e.target.value,
      },
    });
  };

  const handleCreate = () => {
    setYearColors([...yearColors, newYearColor]);
    createYearColor({
      variables: {
        year: newYearColor.attributes.year,
        color: newYearColor.attributes.color,
      },
    });
  };

  const handleDelete = (id: string) => {
    deleteYearColor({
      variables: {
        id: id,
      },
    });
    setYearColors(
      yearColors.filter((year_color: Year_color) => year_color.id !== id)
    );
  };

  if (loading) return <p>Laden...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Geen data</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jaar kleuren</h2>
      {yearColors.map((year_color: Year_color) => (
        <div key={year_color.id} className="mb-4">
          <input
            type="number"
            className="border-2 border-gray-400 rounded-md px-2 py-1 mr-2"
            value={year_color.attributes.year}
            step={1}
            min={2020}
            max={2050}
            onChange={(e) => handleChange(e, year_color.id, "year")}
          />
          <input
            type="text"
            className="border-2 border-gray-400 rounded-md px-2 py-1 mr-2"
            value={year_color.attributes.color}
            onChange={(e) => handleChange(e, year_color.id, "color")}
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(year_color.id)}>Verwijderen</button>
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleUpdate}>Opslaan</button>
      <div className="mt-4">
        <input
          type="number"
          className="border-2 border-gray-400 rounded-md px-2 py-1 mr-2"
          value={newYearColor.attributes.year}
          step={1}
          min={2020}
          max={2050}
          onChange={(e) => handleNewChange(e, "year")}
        />
        <input
          type="text"
          className="border-2 border-gray-400 rounded-md px-2 py-1 mr-2"
          value={newYearColor.attributes.color}
          onChange={(e) => handleNewChange(e, "color")}
        />
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-2" onClick={handleCreate}>Nieuwe toevoegen</button>
    </div>
  );
};

export default YearColors;
