import { useState } from "react"

const Projects = [
  { id: 'prA', name: 'Progetto A - Atlas Spa' },
  { id: 'prB', name: 'Progetto B - RoroDev Spa' },
  { id: 'prC', name: 'Progetto C - Link Srl' },
  { id: 'interno', name: 'Interno' },
]

const Activity = [
  'Sviluppo frontend',
  'Sviluppo backend',
  'Code review',
  'Testing',
  'Analisi requisiti',
  'Riunioni',
  'Documentazione',
  'Altro',
]

function Ore() {
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    date: today,
    projects: '',
    start: '',
    end: '',
    oreManuali: '',
    activity: '',
    note: '',
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [story, setStory] = useState([])

  // Calcolo ore da start/end
  const hoursCal = (() => {
    if (!form.start || !form.end) return 0
    const [sh, sm] = form.start.split(':').map(Number)
    const [eh, em] = form.end.split(':').map(Number)
    const diff = (eh * 60 + em) - (sh * 60 + sm)
    return diff > 0 ? diff / 60 : 0
  })()

  const totalHours = hoursCal > 0
    ? hoursCal
    : parseFloat(form.oreManuali) || 0

  function aggiorna(campo, valore) {
    setForm(prev => ({ ...prev, [campo]: valore }))
    setErrors(prev => ({ ...prev, [campo]: '' }))
  }

  function valida() {
    const e = {}
    if (!form.date)     e.date     = 'Inserisci la data'
    if (!form.projects) e.projects = 'Seleziona un progetto'
    if (!form.activity) e.activity = "Seleziona l'attività"
    if (totalHours <= 0) e.ore     = 'Inserisci le ore'
    return e
  }

  function handleSalva() {
    const e = valida()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    const nuovaVoce = {
      id: Date.now(),
      data: form.date,
      progetto: Projects.find(p => p.id === form.projects)?.name || form.projects,
      ore: totalHours.toFixed(1),
      attivita: form.activity,
    }

    setStory(prev => [nuovaVoce, ...prev])
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
    setForm({ date: today, projects: '', start: '', end: '',
              oreManuali: '', activity: '', note: '' })
  }

  return (
    <div className="ore-page">
      <div className="header">
        <h1 className="page-title">Ore lavorative</h1>
        <p className="page-description">Registra le tue ore</p>
      </div>

      <div className="ore-layout">

        <div className="ore-form">
          <h3 className="row-title">Nuova voce</h3>

          {success && (
            <div className="banner-successo">Ore salvate!</div>
          )}

          <div className="form-row">
            <div className="field">
              <label>Data *</label>
              <input type="date" value={form.date}
                onChange={e => aggiorna('date', e.target.value)} />
              {errors.date && <span className="errore">{errors.date}</span>}
            </div>
            <div className="field">
              <label>Progetto *</label>
              <select value={form.projects}
                onChange={e => aggiorna('projects', e.target.value)}>
                <option value="">Seleziona...</option>
                {Projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {errors.projects && <span className="errore">{errors.projects}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Ora inizio</label>
              <input type="time" value={form.start}
                onChange={e => aggiorna('start', e.target.value)} />
            </div>
            <div className="field">
              <label>Ora fine</label>
              <input type="time" value={form.end}
                onChange={e => aggiorna('end', e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label>Ore manuali (se non usi inizio/fine)</label>
            <input type="number" min="0.5" max="24" step="0.5"
              placeholder="es. 4.5"
              value={form.oreManuali}
              onChange={e => aggiorna('oreManuali', e.target.value)} />
            {errors.ore && <span className="errore">{errors.ore}</span>}
          </div>

          <div className="field">
            <label>Attività *</label>
            <select value={form.activity}
              onChange={e => aggiorna('activity', e.target.value)}>
              <option value="">Seleziona...</option>
              {Activity.map(a => <option key={a}>{a}</option>)}
            </select>
            {errors.activity && <span className="errore">{errors.activity}</span>}
          </div>

          <div className="field">
            <label>Note</label>
            <textarea rows={3} placeholder="Descrivi le attività..."
              value={form.note}
              onChange={e => aggiorna('note', e.target.value)} />
          </div>

          <div className="form-footer">
            <span className="ore-totali">
              Totale: <strong>{totalHours.toFixed(1)}h</strong>
            </span>
            <button className="btn-salva" onClick={handleSalva}>
              Salva ore
            </button>
          </div>
        </div>

        <div className="ore-storico">
          <h3 className="row-title">Storico ore</h3>
          {story.length === 0 ? (
            <p className="storico-vuoto">Nessuna voce ancora!</p>
          ) : (
            <table className="storico-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Progetto</th>
                  <th>Attività</th>
                  <th>Ore</th>
                </tr>
              </thead>
              <tbody>
                {story.map(voce => (
                  <tr key={voce.id}>
                    <td>{voce.data}</td>
                    <td>{voce.progetto}</td>
                    <td>{voce.attivita}</td>
                    <td><strong>{voce.ore}h</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}

export default Ore;