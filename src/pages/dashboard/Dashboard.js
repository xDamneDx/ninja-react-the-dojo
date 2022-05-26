import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";

// Styles:
import "./Dashboard.css";

// Components:
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";

export default function Dashboard() {
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      <ProjectFilter
        currentFilter={currentFilter}
        changeFilter={changeFilter}
      />
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}
