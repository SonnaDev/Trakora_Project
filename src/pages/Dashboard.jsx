function Card({ label, value, delta, deltaPositivo}) {
   return (
    <div className="card-items">
        <div className="card-label">{label}</div>
        <div className="card-value">{value}</div>
        {delta && (
            <div className= {deltaPositivo ?  'card-delta positivo' : 'card-delta negativo'}>
            </div>
        )}

    </div>
   )
}

function Dashboard () {
    return (
        <div className="dash-page">
            <div className="header">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-description">Riepilogo della settimana</p>
            </div>
            <div className="card-grid">
                <Card
                  label="Ore questa settimana"
                  value="36h"
                  delta="+4h settimana scorsa"
                  deltaPositivo={true}
                />
                <Card
                  label="Ferie rimanenti"
                  value="12"
                  delta="su 20 giorno/anno"
                  deltaPositivo={true}
                />  
                <Card
                  label="Permessi in attesa"
                  value="1"
                  delta="Approvazione pending"
                  deltaPositivo={false}
                />  
                
            </div>
            <div className="dash-row">
                <div className="row">
                    <h3 className="row-title">Ore per oggetto</h3>
                    <div className="project">
                        <span className="fbar">Progetto A</span>
                        <div className="track-bar" style={{width: '75%', background: '#185FA5'}}></div>
                        <span className="hr-bar">15h</span>
                    </div>
                    <div className="project">
                        <span className="fbar">Progetto B</span>
                        <div className="track-bar" style={{width: '50%', background: '#0F6E56'}}></div>
                        <span className="hr-bar">10h</span>
                    </div>
                    <div className="project">
                        <span className="fbar">Progetto C</span>
                        <div className="track-bar" style={{width: '30%', background: '#854F0B'}}></div>
                        <span className="hr-bar">15h</span>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default Dashboard