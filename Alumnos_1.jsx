import { useState } from "react";



const theme = {
  primary: "#6A1B9A",
  primaryLight: "#9C4DCC",
  danger: "#E53935",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#757575",
  border: "#E0E0E0",
};

const initialAlumnos = [
  { id: 1, nombre: "SAMANTHA CANDELARIA MORA", matricula: "2114354" },
  { id: 2, nombre: "JAVIER CANTU SILVA", matricula: "2111889" },
  { id: 3, nombre: "ANGEL EMILIANO CARMONA LOZANO", matricula: "2069119" },
  { id: 4, nombre: "JORGE CASTILLO ACOSTA", matricula: "2132842" },
  { id: 5, nombre: "ALDO ADRIAN DAVILA GONZALEZ", matricula: "1994122" },
  { id: 6, nombre: "FABRIZIO DURAN BARRIENTOS", matricula: "2018230" },
  { id: 7, nombre: "SEBASTIAN FLORES GONZALEZ", matricula: "21045641" },
];

// Paper Card component
function Paper({ children, style = {} }) {
  return (
    <div
      style={{
        backgroundColor: theme.surface,
        borderRadius: 8,
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Avatar icon component
function AvatarIcon({ size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#212121",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="white">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    </div>
  );
}

// Modal component
function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
    >
      <Paper style={{ width: "100%", maxWidth: 400, padding: 24 }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 18, color: theme.textPrimary, fontFamily: "sans-serif" }}>
          {title}
        </h2>
        {children}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 20px",
              border: `1px solid ${theme.border}`,
              borderRadius: 4,
              background: "white",
              cursor: "pointer",
              fontFamily: "sans-serif",
              fontSize: 14,
            }}
          >
            Cancelar
          </button>
          {children.props?.onConfirm && (
            <button
              onClick={children.props.onConfirm}
              style={{
                padding: "8px 20px",
                border: "none",
                borderRadius: 4,
                background: theme.primary,
                color: "white",
                cursor: "pointer",
                fontFamily: "sans-serif",
                fontSize: 14,
              }}
            >
              Guardar
            </button>
          )}
        </div>
      </Paper>
    </div>
  );
}

// Text Input component mimicking React Paper TextInput
function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 12,
            color: theme.primary,
            marginBottom: 4,
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          border: `1px solid ${theme.border}`,
          borderBottom: `2px solid ${theme.primary}`,
          borderRadius: "4px 4px 0 0",
          fontSize: 14,
          fontFamily: "sans-serif",
          outline: "none",
          boxSizing: "border-box",
          backgroundColor: "#FAFAFA",
        }}
      />
    </div>
  );
}

export default function AlumnosScreen() {
  const [alumnos, setAlumnos] = useState(initialAlumnos);
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("nombre");
  const [showOrdenar, setShowOrdenar] = useState(false);

  // Modal agregar
  const [modalAgregar, setModalAgregar] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaMatricula, setNuevaMatricula] = useState("");

  // Modal editar
  const [modalEditar, setModalEditar] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editMatricula, setEditMatricula] = useState("");

  // Modal borrar
  const [modalBorrar, setModalBorrar] = useState(false);
  const [alumnoBorrar, setAlumnoBorrar] = useState(null);

  // Tab activa
  const [tabActiva, setTabActiva] = useState("alumnos");

  const alumnosFiltrados = alumnos
    .filter((a) =>
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.matricula.includes(busqueda)
    )
    .sort((a, b) => {
      if (ordenar === "nombre") return a.nombre.localeCompare(b.nombre);
      if (ordenar === "matricula") return a.matricula.localeCompare(b.matricula);
      return 0;
    });

  const handleAgregar = () => {
    if (!nuevoNombre.trim() || !nuevaMatricula.trim()) return;
    setAlumnos([
      ...alumnos,
      { id: Date.now(), nombre: nuevoNombre.toUpperCase(), matricula: nuevaMatricula },
    ]);
    setNuevoNombre("");
    setNuevaMatricula("");
    setModalAgregar(false);
  };

  const handleEditar = (alumno) => {
    setAlumnoEditando(alumno);
    setEditNombre(alumno.nombre);
    setEditMatricula(alumno.matricula);
    setModalEditar(true);
  };

  const handleGuardarEdicion = () => {
    setAlumnos(
      alumnos.map((a) =>
        a.id === alumnoEditando.id
          ? { ...a, nombre: editNombre.toUpperCase(), matricula: editMatricula }
          : a
      )
    );
    setModalEditar(false);
  };

  const handleBorrar = (alumno) => {
    setAlumnoBorrar(alumno);
    setModalBorrar(true);
  };

  const confirmarBorrar = () => {
    setAlumnos(alumnos.filter((a) => a.id !== alumnoBorrar.id));
    setModalBorrar(false);
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        minHeight: "100vh",
        backgroundColor: theme.background,
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: theme.surface,
          padding: "16px 16px 0",
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <h1 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 700, color: theme.textPrimary }}>
          alumnos
        </h1>

        {/* Search bar */}
        <div style={{ marginBottom: 12 }}>
          <p style={{ margin: "0 0 6px", fontSize: 12, color: theme.textSecondary, fontWeight: 600 }}>
            Busca por nombre:
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${theme.border}`,
              borderRadius: 4,
              padding: "6px 12px",
              backgroundColor: "#FAFAFA",
            }}
          >
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="ejemplo: David Garza"
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: 14,
                outline: "none",
                color: theme.textSecondary,
              }}
            />
            <svg width="20" height="20" viewBox="0 0 24 24" fill={theme.textSecondary}>
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Add button */}
      <button
        onClick={() => setModalAgregar(true)}
        style={{
          backgroundColor: theme.primary,
          color: "white",
          border: "none",
          padding: "14px",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          letterSpacing: 0.5,
        }}
      >
        <span style={{ fontSize: 20, lineHeight: 1 }}>+</span> Agregar alumno
      </button>

      {/* Ordenar section */}
      <div style={{ backgroundColor: theme.surface, borderBottom: `1px solid ${theme.border}` }}>
        <div
          style={{
            padding: "8px 16px",
            fontSize: 12,
            color: theme.textSecondary,
            backgroundColor: "#EEEEEE",
          }}
        >
          Ordenar
        </div>
        <button
          onClick={() => setShowOrdenar(!showOrdenar)}
          style={{
            width: "100%",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "none",
            background: "white",
            cursor: "pointer",
            fontSize: 15,
            color: theme.textPrimary,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={theme.textSecondary}>
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
            </svg>
            Ordenar
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={theme.textSecondary}
            style={{ transform: showOrdenar ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }}
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        {showOrdenar && (
          <div style={{ borderTop: `1px solid ${theme.border}` }}>
            {["nombre", "matricula"].map((op) => (
              <button
                key={op}
                onClick={() => { setOrdenar(op); setShowOrdenar(false); }}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  textAlign: "left",
                  background: ordenar === op ? "#EDE7F6" : "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  color: ordenar === op ? theme.primary : theme.textPrimary,
                  fontWeight: ordenar === op ? 600 : 400,
                  textTransform: "capitalize",
                }}
              >
                {op === "nombre" ? "Nombre" : "Matrícula"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lista de alumnos */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {alumnosFiltrados.map((alumno, index) => (
          <div
            key={alumno.id}
            style={{
              backgroundColor: theme.surface,
              borderBottom: `1px solid ${theme.border}`,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AvatarIcon size={42} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: theme.textPrimary }}>
                {alumno.nombre}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.textSecondary }}>
                {alumno.matricula}
              </p>
            </div>
            <button
              onClick={() => handleEditar(alumno)}
              style={{
                padding: "6px 14px",
                border: "none",
                background: "transparent",
                color: theme.primary,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Editar
            </button>
            <button
              onClick={() => handleBorrar(alumno)}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: 20,
                background: theme.danger,
                color: "white",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Borrar
            </button>
          </div>
        ))}
        {alumnosFiltrados.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", color: theme.textSecondary, fontSize: 14 }}>
            No se encontraron alumnos
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div
        style={{
          backgroundColor: theme.surface,
          borderTop: `1px solid ${theme.border}`,
          display: "flex",
          justifyContent: "space-around",
          padding: "8px 0 4px",
        }}
      >
        {[
          {
            key: "index",
            label: "index",
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            ),
          },
          {
            key: "alumnos",
            label: "alumnos",
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            ),
          },
          {
            key: "perfil",
            label: "perfil",
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            ),
          },
          {
            key: "config",
            label: "config",
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            ),
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTabActiva(tab.key)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: tabActiva === tab.key ? theme.primary : theme.textSecondary,
              fontSize: 10,
              fontWeight: tabActiva === tab.key ? 700 : 400,
              padding: "4px 12px",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Modal: Agregar alumno */}
      {modalAgregar && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16,
          }}
        >
          <Paper style={{ width: "100%", maxWidth: 400, padding: 24 }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 18, color: theme.textPrimary }}>
              Agregar alumno
            </h2>
            <TextInput
              label="Nombre completo"
              value={nuevoNombre}
              onChange={setNuevoNombre}
              placeholder="Ej. Juan Pérez García"
            />
            <TextInput
              label="Matrícula"
              value={nuevaMatricula}
              onChange={setNuevaMatricula}
              placeholder="Ej. 2023001"
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
              <button
                onClick={() => setModalAgregar(false)}
                style={{
                  padding: "8px 20px",
                  border: `1px solid ${theme.border}`,
                  borderRadius: 4,
                  background: "white",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleAgregar}
                style={{
                  padding: "8px 20px",
                  border: "none",
                  borderRadius: 4,
                  background: theme.primary,
                  color: "white",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Guardar
              </button>
            </div>
          </Paper>
        </div>
      )}

      {/* Modal: Editar alumno */}
      {modalEditar && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16,
          }}
        >
          <Paper style={{ width: "100%", maxWidth: 400, padding: 24 }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 18, color: theme.textPrimary }}>
              Editar alumno
            </h2>
            <TextInput
              label="Nombre completo"
              value={editNombre}
              onChange={setEditNombre}
            />
            <TextInput
              label="Matrícula"
              value={editMatricula}
              onChange={setEditMatricula}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
              <button
                onClick={() => setModalEditar(false)}
                style={{
                  padding: "8px 20px",
                  border: `1px solid ${theme.border}`,
                  borderRadius: 4,
                  background: "white",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarEdicion}
                style={{
                  padding: "8px 20px",
                  border: "none",
                  borderRadius: 4,
                  background: theme.primary,
                  color: "white",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Guardar
              </button>
            </div>
          </Paper>
        </div>
      )}

      {/* Modal: Confirmar borrar */}
      {modalBorrar && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16,
          }}
        >
          <Paper style={{ width: "100%", maxWidth: 380, padding: 24 }}>
            <h2 style={{ margin: "0 0 12px", fontSize: 18, color: theme.textPrimary }}>
              ¿Borrar alumno?
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: theme.textSecondary }}>
              ¿Estás seguro de que deseas eliminar a{" "}
              <strong>{alumnoBorrar?.nombre}</strong>? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={() => setModalBorrar(false)}
                style={{
                  padding: "8px 20px",
                  border: `1px solid ${theme.border}`,
                  borderRadius: 4,
                  background: "white",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarBorrar}
                style={{
                  padding: "8px 20px",
                  border: "none",
                  borderRadius: 4,
                  background: theme.danger,
                  color: "white",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Borrar
              </button>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
}
