"use client";
import { fetchUser } from "@/app/api/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_YEAR_COLORS, UPDATE_YEAR_COLOR, CREATE_YEAR_COLOR } from "@/app/api/year-color";
import { useMutation, useQuery } from "@apollo/client";

const YearColors = () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/admin/rings");
  // }
  // const activeUser = await fetchUser(session?.id);
  // if (activeUser.attributes.role?.data.attributes.name !== "admin") {
  //   return <h1 className="text-4xl ">Not authorized</h1>;
  // }
  const { data, loading, error } = useQuery(GET_YEAR_COLORS);
  const [yearColors, setYearColors] = useState<Year_colors>([]);
  const [updateYearColor] = useMutation(UPDATE_YEAR_COLOR);
  const [createYearColor] = useMutation(CREATE_YEAR_COLOR);
  const [newYearColor, setNewYearColor] = useState<Year_color>({
    id: "",
    attributes: {
      year: 0,
      color: ""
    }
  });

  useEffect(() => {
    if (data) {
      setYearColors(data.yearColors.data);
    }
  }, [data]);

  const handleChange = (e: any, id: string, field: string) => {
    const newYearColors = yearColors.map((year_color: Year_color) => {
      if (year_color.id === id) {
        return {
          ...year_color,
          attributes: {
            ...year_color.attributes,
            [field]: (field === "year" ? parseInt(e.target.value) : e.target.value),
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
          color: year_color.attributes.color
        }
      })
    })
  };

  const handleNewChange = (e: any, field: string) => {
    setNewYearColor({
      ...newYearColor,
      attributes: {
        ...newYearColor.attributes,
        [field]: (field === "year" ? parseInt(e.target.value) : e.target.value),
      },
    });
  }

  const handleCreate = () => {
    setYearColors([...yearColors, newYearColor]);
    createYearColor({
      variables: {
        year: newYearColor.attributes.year,
        color: newYearColor.attributes.color
      }
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      {yearColors.map((year_color: Year_color) => (
        <div key={year_color.id}>
          <input 
            type="number" 
            value={year_color.attributes.year} 
            step={1}
            min={1980}
            max={3000}
            onChange={(e) => handleChange(e, year_color.id, "year")}
            />
          <input 
            type="text" 
            value={year_color.attributes.color} 
            onChange={(e) => handleChange(e, year_color.id, "color")}
            />
        </div>
      ))}
      <button onClick={handleUpdate}>Save</button>
      <div>
          <input 
            type="number" 
            value={newYearColor.attributes.year} 
            step={1}
            min={1980}
            max={3000}
            onChange={(e) => handleNewChange(e, "year")}
            />
          <input 
            type="text" 
            value={newYearColor.attributes.color} 
            onChange={(e) => handleNewChange(e, "color")}
            />
          </div>
        <button onClick={handleCreate}>Add new</button>
    </div>
  );
};

export default YearColors;
