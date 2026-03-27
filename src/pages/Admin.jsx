import { useState, useEffect } from 'react';
import MujerCard from '../components/MujerCard';
import styles from './Admin.module.css';

const API_URL = 'http://localhost:5000/api';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [mujeres, setMujeres] = useState([]);
  const [vista, setVista] = useState('grid');
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    años_en_sector: '',
    años_texto: '',
    rol: '',
    por_que_conocida: '',
    que_ha_hecho: '',
    descripcion_narrativa: '',
    color_acento: '#F97316',
    color_fondo: '#FFF5EB',
    foto: null,
    fotoExisting: null, // to store existing URL for preview
    audio: null,
    audioExisting: null,
    consentimiento_pdf: null,
    pdfExisting: null,
    transcripcion: '',
    esLider: false
  });

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error de autenticación');
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setUser(data.user);
      await fetchMujeres(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setUser(null);
    setMujeres([]);
    setFetchError('');
  };

  const fetchMujeres = async (currentToken = token) => {
    if (!currentToken) return;
    setFetchError('');
    try {
      const res = await fetch(`${API_URL}/mujeres`, {
        headers: { 'Authorization': `Bearer ${currentToken}` }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Error ${res.status}`);
      }
      const data = await res.json();
      setMujeres(data);
    } catch (err) {
      console.error('Error al cargar mujeres:', err);
      setFetchError('No se pudieron cargar las mujeres. Verifica tu conexión o inicia sesión nuevamente.');
    }
  };

  useEffect(() => {
    if (token) fetchMujeres();
  }, [token]);

  const openModal = (mujer = null) => {
    if (mujer) {
      setEditando(mujer.id);
      setFormData({
        nombre: mujer.nombre || '',
        años_en_sector: mujer.años_en_sector || '',
        años_texto: mujer.años_texto || '',
        rol: mujer.rol || '',
        por_que_conocida: mujer.por_que_conocida || '',
        que_ha_hecho: mujer.que_ha_hecho || '',
        descripcion_narrativa: mujer.descripcion_narrativa || '',
        color_acento: mujer.color_acento || '#F97316',
        color_fondo: mujer.color_fondo || '#FFF5EB',
        foto: null,
        fotoExisting: mujer.foto || null,
        audio: null,
        audioExisting: mujer.audio || null,
        consentimiento_pdf: null,
        pdfExisting: mujer.consentimiento_pdf || null,
        transcripcion: mujer.transcripcion || '',
        esLider: mujer.esLider === 1
      });
    } else {
      setEditando(null);
      setFormData({
        nombre: '',
        años_en_sector: '',
        años_texto: '',
        rol: '',
        por_que_conocida: '',
        que_ha_hecho: '',
        descripcion_narrativa: '',
        color_acento: '#F97316',
        color_fondo: '#FFF5EB',
        foto: null,
        fotoExisting: null,
        audio: null,
        audioExisting: null,
        consentimiento_pdf: null,
        pdfExisting: null,
        transcripcion: '',
        esLider: false
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditando(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();

    // Append all fields
    for (const key in formData) {
      if (key === 'foto' || key === 'audio' || key === 'consentimiento_pdf') {
        // Only append if a new file is selected
        if (formData[key] instanceof File) {
          form.append(key, formData[key]);
        }
      } else if (key === 'esLider') {
        // Convert boolean to 1/0
        form.append(key, formData[key] ? 1 : 0);
      } else if (key !== 'fotoExisting' && key !== 'audioExisting' && key !== 'pdfExisting') {
        // Append other fields
        form.append(key, formData[key] !== undefined ? formData[key] : '');
      }
    }

    const url = editando ? `${API_URL}/mujeres/${editando}` : `${API_URL}/mujeres`;
    const method = editando ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: form
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchMujeres();
      closeModal();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este perfil permanentemente?')) return;
    try {
      const res = await fetch(`${API_URL}/mujeres/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error al eliminar');
      await fetchMujeres();
    } catch (err) {
      alert(err.message);
    }
  };

  // Pantalla de login
  if (!token) {
    return (
        <main className={styles.main}>
          <div className={styles.loginCard}>
            <p className="eyebrow">Acceso restringido</p>
            <h1 className={styles.title}>Panel admin</h1>
            <div className="divider" />
            <p className={styles.desc}>Ingresa tus credenciales para acceder al panel de administración.</p>
            <form onSubmit={handleLogin} className={styles.form}>
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
              />
              <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
              />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Verificando...' : 'Ingresar'}
              </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </main>
    );
  }

  // Dashboard
  return (
      <main className={styles.main}>
        <div className={styles.adminHeader}>
          <div>
            <p className="eyebrow">Panel de administración</p>
            <h1 className={styles.title}>
              Hola, <span className={styles.userEmail}>{user?.email || 'Administrador'}</span>
            </h1>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Cerrar sesión
          </button>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.toggle}>
            <button
                className={`${styles.toggleBtn} ${vista === 'grid' ? styles.toggleActive : ''}`}
                onClick={() => setVista('grid')}
            >
              <span className={styles.toggleIcon}>⊞</span> Grid
            </button>
            <button
                className={`${styles.toggleBtn} ${vista === 'lista' ? styles.toggleActive : ''}`}
                onClick={() => setVista('lista')}
            >
              <span className={styles.toggleIcon}>☰</span> Lista
            </button>
          </div>
          <button className={styles.addButton} onClick={() => openModal()}>
            + Agregar mujer
          </button>
        </div>

        {fetchError && <div className={styles.errorBanner}>{fetchError}</div>}

        {mujeres.length === 0 && !fetchError ? (
            <div className={styles.emptyState}>
              <p>No hay mujeres registradas en la base de datos.</p>
              <p>Usa el botón "+ Agregar mujer" para crear el primer perfil.</p>
            </div>
        ) : (
            <div className={vista === 'grid' ? styles.grid : styles.lista}>
              {mujeres.map((m) => (
                  <div key={m.id} className={styles.cardWrapper}>
                    <MujerCard mujer={m} layout={vista} />
                    <div className={styles.cardActions}>
                      <button className={styles.editBtn} onClick={() => openModal(m)}>✏️ Editar</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(m.id)}>🗑️ Eliminar</button>
                    </div>
                  </div>
              ))}
            </div>
        )}

        {/* Modal */}
        {modalOpen && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle}>{editando ? '✏️ Editar perfil' : '➕ Agregar nueva mujer'}</h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                  <div className={styles.formGrid}>
                    <div className={styles.grupo}>
                      <label className={styles.label}>Nombre completo *</label>
                      <input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                          className={styles.input}
                          required
                      />
                    </div>
                    <div className={styles.grupo}>
                      <label className={styles.label}>Rol</label>
                      <input
                          type="text"
                          value={formData.rol}
                          onChange={(e) => setFormData({...formData, rol: e.target.value})}
                          className={styles.input}
                      />
                    </div>
                    <div className={styles.grupo}>
                      <label className={styles.label}>Años en el sector (número)</label>
                      <input
                          type="number"
                          value={formData.años_en_sector}
                          onChange={(e) => setFormData({...formData, años_en_sector: e.target.value})}
                          className={styles.input}
                      />
                    </div>
                    <div className={styles.grupo}>
                      <label className={styles.label}>Texto años</label>
                      <input
                          type="text"
                          value={formData.años_texto}
                          onChange={(e) => setFormData({...formData, años_texto: e.target.value})}
                          className={styles.input}
                          placeholder="Ej: Toda su vida (~43 años)"
                      />
                    </div>
                    <div className={styles.grupo}>
                      <label className={styles.label}>Color acento (avatar)</label>
                      <input
                          type="color"
                          value={formData.color_acento}
                          onChange={(e) => setFormData({...formData, color_acento: e.target.value})}
                          className={styles.colorInput}
                      />
                    </div>
                    <div className={styles.grupo}>
                      <label className={styles.label}>Color fondo tarjeta</label>
                      <input
                          type="color"
                          value={formData.color_fondo}
                          onChange={(e) => setFormData({...formData, color_fondo: e.target.value})}
                          className={styles.colorInput}
                      />
                    </div>
                    <div className={styles.grupo}>
                      <label className={styles.labelCheckbox}>
                        <input
                            type="checkbox"
                            checked={formData.esLider}
                            onChange={(e) => setFormData({...formData, esLider: e.target.checked})}
                        />
                        Marcar como líder comunitaria
                      </label>
                    </div>
                  </div>

                  <div className={styles.grupo}>
                    <label className={styles.label}>¿Por qué es conocida?</label>
                    <textarea
                        value={formData.por_que_conocida}
                        onChange={(e) => setFormData({...formData, por_que_conocida: e.target.value})}
                        className={styles.textarea}
                        rows={2}
                    />
                  </div>
                  <div className={styles.grupo}>
                    <label className={styles.label}>¿Qué ha hecho por la comunidad?</label>
                    <textarea
                        value={formData.que_ha_hecho}
                        onChange={(e) => setFormData({...formData, que_ha_hecho: e.target.value})}
                        className={styles.textarea}
                        rows={3}
                    />
                  </div>
                  <div className={styles.grupo}>
                    <label className={styles.label}>Descripción narrativa</label>
                    <textarea
                        value={formData.descripcion_narrativa}
                        onChange={(e) => setFormData({...formData, descripcion_narrativa: e.target.value})}
                        className={styles.textarea}
                        rows={4}
                    />
                  </div>
                  <div className={styles.grupo}>
                    <label className={styles.label}>Transcripción completa (diálogo)</label>
                    <textarea
                        value={formData.transcripcion}
                        onChange={(e) => setFormData({...formData, transcripcion: e.target.value})}
                        className={styles.textarea}
                        rows={6}
                    />
                  </div>

                  <div className={styles.fileGrid}>
                    <div className={styles.grupo}>
                      <label className={styles.label}>Foto (imagen)</label>
                      {formData.fotoExisting && (
                          <div className={styles.filePreview}>
                            <span>Archivo actual: </span>
                            <a href={formData.fotoExisting} target="_blank" rel="noopener noreferrer">
                              Ver imagen
                            </a>
                          </div>
                      )}
                      <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setFormData({...formData, foto: e.target.files[0]})}
                          className={styles.file}
                      />
                    </div>
                    <div className={styles.grupo}>
                      <label className={styles.label}>Audio</label>
                      {formData.audioExisting && (
                          <div className={styles.filePreview}>
                            <span>Archivo actual: </span>
                            <a href={formData.audioExisting} target="_blank" rel="noopener noreferrer">
                              Escuchar
                            </a>
                          </div>
                      )}
                      <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => setFormData({...formData, audio: e.target.files[0]})}
                          className={styles.file}
                      />
                    </div>
                    <div className={styles.grupo}>
                      <label className={styles.label}>PDF de consentimiento</label>
                      {formData.pdfExisting && (
                          <div className={styles.filePreview}>
                            <span>Archivo actual: </span>
                            <a href={formData.pdfExisting} target="_blank" rel="noopener noreferrer">
                              Ver PDF
                            </a>
                          </div>
                      )}
                      <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setFormData({...formData, consentimiento_pdf: e.target.files[0]})}
                          className={styles.file}
                      />
                    </div>
                  </div>

                  <div className={styles.modalActions}>
                    <button type="submit" className="btn-primary" disabled={loading}>
                      {editando ? 'Actualizar' : 'Guardar'}
                    </button>
                    <button type="button" onClick={closeModal} className="btn-outline">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </main>
  );
}