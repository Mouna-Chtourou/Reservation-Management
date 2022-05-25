import React, { useEffect, useState } from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import Layout from '../layout.js'
import { useSelector } from 'react-redux'
import { Doughnut, Pie, Bar, Line } from 'react-chartjs-2'
import axios from 'axios'

function Dashboard() {
  const [labelsEmp, setLabelsEmp] = useState([])
  const [dataEmp, setDataEmp] = useState([])
  const [labelsSalle, setLabelsSalle] = useState([])
  const [dataSalle, setDataSalle] = useState([])
  const [labelsRes, setLabelsRes] = useState([])
  const [dataRes, setDataRes] = useState([])
  const [labelsResParOrg, setLabelsResParOrg] = useState([])
  const [dataResParOrg, setDataResParOrg] = useState([])
  const [labelsResParMois, setLabelsResParMois] = useState([])
  const [dataResParMois, setDataResParMois] = useState([])
  const [labelsResParJour, setLabelsResParJour] = useState([])
  const [dataResParJour, setDataResParJour] = useState([])
  const [labelsRessource, setLabelsRessource] = useState([])
  const [dataRessource, setDataRessource] = useState([])
  const [labelsSalle_Ressource, setLabelsSalle_Ressource] = useState([])
  const [dataSalle_Ressource, setDataSalle_Ressource] = useState([])
  const [nbUser, setNbUser] = useState('')
  const [nbRes, setNbRes] = useState('')
  const [nbSalle, setNbSalle] = useState('')
  const [nbRessource, setNbRessource] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  function toMonthName(monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    return date.toLocaleString([], {
      month: 'long',
    })
  }

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    axios.get('/statistiques/employes/', config).then(res => {
      res.data.map((employe, i) => {
        setDataEmp([...dataEmp, employe.nbr_emp])
      })
      setLabelsEmp(res.data.map(a => a.nom))
    })

    axios.get('/statistiques/salles/', config).then(res => {
      res.data.map((salle, i) => {
        setDataSalle([...dataSalle, salle.nbr_salle])
      })
      setLabelsSalle(res.data.map(a => a.nom))
    })
    axios.get('/statistiques/users', config).then(res => {
      res.data.users.map(user => {
        userInfo &&
          userInfo.role === 'representant' &&
          user._id === userInfo.organisme._id &&
          setNbUser(user.nbr)
        userInfo && userInfo.role === 'admin' && setNbUser(res.data.users_total)
      })
    })
    axios.get('/statistiques/nbRes', config).then(res => {
      res.data.reservations.map(reser => {
        userInfo &&
          userInfo.role === 'representant' &&
          reser._id === userInfo.organisme._id &&
          setNbRes(reser.nbr)
        userInfo &&
          userInfo.role === 'admin' &&
          setNbRes(
            res.data.reservations_total.map(r => {
              return r.nbr
            })
          )
      })
    })
    axios.get('/statistiques/nbSalle', config).then(res => {
      res.data.salles.map(salle => {
        userInfo &&
          userInfo.role === 'representant' &&
          salle._id === userInfo.organisme._id &&
          setNbSalle(salle.nbr)
        userInfo && userInfo.role === 'admin' && setNbSalle(res.data.salles_total)
      })
    })
    axios.get('/statistiques/nbRessource', config).then(res => {
      res.data.ressources.map(ress => {
        userInfo &&
          userInfo.role === 'representant' &&
          ress._id === userInfo.organisme._id &&
          setNbRessource(ress.nbr)
        userInfo && userInfo.role === 'admin' && setNbRessource(res.data.ressources_total)
      })
    })

    axios.get('/statistiques/reservations', config).then(res => {
      res.data.map((reserv, i) => {
        if (
          userInfo &&
          userInfo.role === 'representant' &&
          reserv.nom.organisme === userInfo.organisme.nom
        ) {
          setDataRes([...dataRes, reserv.nbr_reservation])
          labelsRes.push(reserv.nom.salle)
          setLabelsRes(labelsRes)
        }
        if (userInfo && userInfo.role === 'admin') {
          setDataRes([...dataRes, reserv.nbr_reservation])
          labelsRes.push(reserv.nom.salle)
          setLabelsRes(labelsRes)
        }
      })
    })
    axios.get('/statistiques/reservationParOrg', config).then(res => {
      res.data.map((reserv, i) => {
        setDataResParOrg([...dataResParOrg, reserv.nbr_reservation])
      })
      setLabelsResParOrg(res.data.map(a => a.nom))
    })
    axios.get('/statistiques/res/semaine', config).then(res => {
      userInfo &&
        userInfo.role === 'admin' &&
        res.data.reservations.map((reserv, i) => {
          setDataResParMois([...dataResParMois, reserv.nbr_reservation])
        })
      userInfo &&
        userInfo.role === 'representant' &&
        res.data.reservations_organisme.map((reserv, i) => {
          reserv._id.organisme === userInfo.organisme.nom &&
            setDataResParMois([...dataResParMois, reserv.count_])
        })
      userInfo &&
        userInfo.role === 'admin' &&
        setLabelsResParMois(res.data.reservations.map(a => toMonthName(a._id)))
      userInfo &&
        userInfo.role === 'representant' &&
        res.data.reservations_organisme.map(a => {
          if (a._id.organisme === userInfo.organisme.nom) {
            labelsResParMois.push(toMonthName(a._id.createdAtMonth))
            setLabelsResParMois(labelsResParMois)
          }
        })
    })
    axios.get('/statistiques/ressources', config).then(res => {
      res.data.map(reserv => {
        setDataRessource([...dataRessource, reserv.nbr_reservation])
      })
      setLabelsRessource(res.data.map(a => a.nom))
    })
    axios.get('/statistiques/salle_ressources', config).then(res => {
      res.data.salles_organisme.map(ressource => {
        setDataSalle_Ressource([...dataSalle_Ressource, ressource.avec.count, ressource.sans.count])
        setLabelsSalle_Ressource([
          ...labelsSalle_Ressource,
          ressource.avec.description,
          ressource.sans.description,
        ])
      })
    })
    axios.get('/statistiques/jour', config).then(res => {
      userInfo &&
        userInfo.role === 'admin' &&
        res.data.reservations.map((reserv, i) => {
          setDataResParJour([...dataResParJour, reserv.nbr_reservation])
        })
      userInfo &&
        userInfo.role === 'representant' &&
        res.data.reservations_organisme.map((reserv, i) => {
          reserv._id.organisme === userInfo.organisme.nom &&
            setDataResParJour([...dataResParJour, reserv.count_])
        })
      userInfo &&
        userInfo.role === 'admin' &&
        setLabelsResParJour(res.data.reservations.map(a => a._id.day + toMonthName(a._id.month)))
      userInfo &&
        userInfo.role === 'representant' &&
        res.data.reservations_organisme.map(a => {
          if (a._id.organisme === userInfo.organisme.nom) {
            labelsResParJour.push(a._id.createdAtDay + toMonthName(a._id.createdAtMonth))
            setLabelsResParJour(labelsResParJour)
          }
        })
    })
  }, [])

  const doughnutPieDataEmp = {
    datasets: [
      {
        data: dataEmp,
        backgroundColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
        borderColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
      },
    ],
    labels: labelsEmp,
  }
  const doughnutPieOptionsEmp = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  }
  const doughnutPieDataRes = {
    datasets: [
      {
        data: dataResParOrg,
        backgroundColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
        borderColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
      },
    ],
    labels: labelsResParOrg,
  }
  const doughnutPieOptionsRes = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  }

  const doughnutPieDataRessource = {
    datasets: [
      {
        data: dataSalle_Ressource,
        backgroundColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
        borderColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
      },
    ],
    labels: labelsSalle_Ressource,
  }
  const doughnutPieOptionsRessource = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  }

  const datasalle = {
    labels: labelsSalle,
    datasets: [
      {
        label: '# salles',
        data: dataSalle,
        backgroundColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
        borderColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227,36,87,255)',
          'rgba(75, 192, 192, 255)',
          ,
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  }
  const optionsSalle = {
    scales: {
      yAxes: [{ max: 20, min: 0, ticks: { beginAtZero: true, stepSize: 1 } }],
    },
    legend: {
      display: false,
    },
    elements: {
      point: { radius: 0 },
    },
  }
  const dataressource = {
    labels: labelsRessource,

    datasets: [
      {
        label: '# salles',
        data: dataRessource,
        backgroundColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
        borderColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227,36,87,255)',
          'rgba(75, 192, 192, 255)',
          ,
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  }
  const optionsRessource = {
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
    legend: { display: false },
    elements: { point: { radius: 0 } },
  }
  const datares = {
    labels: labelsRes,
    datasets: [
      {
        label: 'Nombre de réservations',
        data: dataRes,
        backgroundColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
        borderColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  }
  const optionsRes = {
    scales: {
      yAxes: [{ max: 20, min: 0, ticks: { beginAtZero: true, stepSize: 1 } }],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel
        },
      },
    },
  }
  function repeatColors(dataResParJour, colors) {
    var result = []
    for (var i = 0; i < dataResParJour.length; i++) {
      result.push(colors[i % colors.length])
    }
    return result
  }
  var bgColors = [
    'rgba(49,173,225,255)',
    'rgba(248,180,55,255)',
    'rgba(227, 36, 87, 255)',
    'rgba(116, 179, 88, 255)',
  ]
  var borderColors = [
    'rgba(49,173,225,255)',
    'rgba(248,180,55,255)',
    'rgba(227, 36, 87, 255)',
    'rgba(116, 179, 88, 255)',
  ]
  const dataresParJour = {
    labels: labelsResParJour,
    datasets: [
      {
        label: 'Nombre de réservations',
        data: dataResParJour,
        backgroundColor: repeatColors(dataResParJour, bgColors),
        borderColor: repeatColors(dataResParJour, borderColors),

        borderWidth: 1,
        fill: false,
      },
    ],
  }
  const optionsResParJour = {
    scales: {
      yAxes: [{ max: 20, min: 0, ticks: { beginAtZero: true, stepSize: 1 } }],
    },
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel
        },
      },
    },
  }

  const data = {
    labels: labelsResParMois,
    datasets: [
      {
        label: 'Nombre de réservations',
        data: dataResParMois,
        backgroundColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
        borderColor: [
          'rgba(49,173,225,255)',
          'rgba(248,180,55,255)',
          'rgba(227, 36, 87, 255)',
          'rgba(116, 179, 88, 255)',
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  }
  const options = {
    scales: {
      yAxes: [{ max: 20, min: 0, ticks: { beginAtZero: true, stepSize: 1 } }],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel
        },
      },
    },
  }
  return (
    <Layout>
      <div>
        <div className='d-sm-flex justify-content-between align-items-start'>
          <h2 className='text-dark font-weight-bold mb-2'> Dashboard </h2>
        </div>
        <br />
        {userInfo && userInfo.role === 'admin' && (
          <div className='row'>
            <div className='col-md-12'>
              <div className='justify-content-between align-items-center tab-transparent'>
                <div className='row'>
                  <div className='col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card'>
                    <div className='card card-rounded  '>
                      <div className='card-padding text-center'>
                        <h5 className='mb-2 text-dark font-weight-normal'>Utilisateurs</h5>
                        <h2 className='mb-4 text-dark font-weight-bold'>{nbUser}</h2>
                        <div className='px-4 d-flex align-items-center'>
                          <svg width='0' height='0'>
                            <defs>
                              <linearGradient id='progress-users'>
                                <stop offset='0%' stopColor='#31ade1' />
                                <stop offset='100%' stopColor='#31ade1' />
                              </linearGradient>
                            </defs>
                          </svg>
                          <CircularProgressbarWithChildren
                            className='progress-users'
                            value={nbUser}
                          >
                            <div>
                              <i className='mdi mdi-account-circle icon-md absolute-center text-dark'></i>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card'>
                    <div className='card card-rounded '>
                      <div className='card-padding text-center'>
                        <h5 className='mb-2 text-dark font-weight-normal'>Salles</h5>
                        <h2 className='mb-4 text-dark font-weight-bold'>{nbSalle}</h2>
                        <div className='px-4 d-flex align-items-center'>
                          <svg width='0' height='0'>
                            <defs>
                              <linearGradient id='progress-salles'>
                                <stop offset='0%' stopColor='#f8b437' />
                                <stop offset='100%' stopColor='#f8b437' />
                              </linearGradient>
                            </defs>
                          </svg>
                          <CircularProgressbarWithChildren
                            className='progress-salles'
                            value={nbSalle}
                          >
                            <div>
                              <i className='mdi mdi-table-chair icon-md absolute-center text-dark'></i>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card'>
                    <div className='card card-rounded '>
                      <div className='card-padding text-center'>
                        <h5 className='mb-2 text-dark font-weight-normal'>Ressources</h5>
                        <h2 className='mb-4 text-dark font-weight-bold'>{nbRessource}</h2>
                        <div className='px-4 d-flex align-items-center'>
                          <svg width='0' height='0'>
                            <defs>
                              <linearGradient id='progress-ressources'>
                                <stop offset='0%' stopColor='#e32457' />
                                <stop offset='100%' stopColor='#e32457' />
                              </linearGradient>
                            </defs>
                          </svg>
                          <CircularProgressbarWithChildren
                            className='progress-ressources'
                            value={nbRessource}
                          >
                            <div>
                              <i className='mdi mdi-eye icon-md absolute-center text-dark'></i>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card'>
                    <div className='card card-rounded '>
                      <div className='card-padding text-center'>
                        <h5 className='mb-2 text-dark font-weight-normal'>Réservations</h5>
                        <h2 className='mb-4 text-dark font-weight-bold'>{nbRes}</h2>
                        <div className='px-4 d-flex align-items-center'>
                          <svg width='0' height='0'>
                            <defs>
                              <linearGradient id='progress-reservations'>
                                <stop offset='0%' stopColor='#74b358' />
                                <stop offset='100%' stopColor='#74b358' />
                              </linearGradient>
                            </defs>
                          </svg>
                          <CircularProgressbarWithChildren
                            className='progress-reservations'
                            value={nbRes}
                          >
                            <div>
                              <i className='mdi mdi-calendar-month icon-md absolute-center text-dark'></i>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 grid-margin stretch-card'>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre d'employés par organisme</h4>
                        <Doughnut data={doughnutPieDataEmp} options={doughnutPieOptionsEmp} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 grid-margin stretch-card '>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de salles par organisme</h4>
                        <Bar data={datasalle} options={optionsSalle} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 grid-margin stretch-card '>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de ressources par organisme</h4>
                        <Bar data={dataressource} options={optionsRessource} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 grid-margin stretch-card'>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de salles avec ou sans ressource</h4>
                        <Pie
                          data={doughnutPieDataRessource}
                          options={doughnutPieOptionsRessource}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6 grid-margin stretch-card'>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de réservations par organisme</h4>
                        <Pie data={doughnutPieDataRes} options={doughnutPieOptionsRes} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 grid-margin stretch-card'>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de réservations par salle</h4>
                        <Line data={datares} options={optionsRes} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 grid-margin stretch-card'>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de réservations chaque mois</h4>
                        <Line data={data} options={options} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 grid-margin stretch-card'>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de réservations par Jour</h4>
                        <Line data={dataresParJour} options={optionsResParJour} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {userInfo && userInfo.role === 'representant' && (
          <div className='row'>
            <div className='col-md-12'>
              <div className='justify-content-between align-items-center tab-transparent'>
                <div className='row'>
                  <div className='col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card'>
                    <div className='card card-rounded '>
                      <div className='card-padding text-center'>
                        <h5 className='mb-2 text-dark font-weight-normal'>Employés</h5>
                        <h2 className='mb-4 text-dark font-weight-bold'>{nbUser}</h2>
                        <div className='px-4 d-flex align-items-center'>
                          <svg width='0' height='0'>
                            <defs>
                              <linearGradient id='progress-users'>
                                <stop offset='0%' stopColor='#31ade1' />
                                <stop offset='100%' stopColor='#31ade1' />
                              </linearGradient>
                            </defs>
                          </svg>
                          <CircularProgressbarWithChildren
                            className='progress-users'
                            value={nbUser}
                          >
                            <div>
                              <i className='mdi mdi-account-circle icon-md absolute-center text-dark'></i>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card'>
                    <div className='card card-rounded '>
                      <div className='card-padding text-center'>
                        <h5 className='mb-2 text-dark font-weight-normal'>Salles</h5>
                        <h2 className='mb-4 text-dark font-weight-bold'>{nbSalle}</h2>
                        <div className='px-4 d-flex align-items-center'>
                          <svg width='0' height='0'>
                            <defs>
                              <linearGradient id='progress-salles'>
                                <stop offset='0%' stopColor='#f8b437' />
                                <stop offset='100%' stopColor='#f8b437' />
                              </linearGradient>
                            </defs>
                          </svg>
                          <CircularProgressbarWithChildren
                            className='progress-salles'
                            value={nbSalle}
                          >
                            <div>
                              <i className='mdi mdi-table-chair icon-md absolute-center text-dark'></i>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card'>
                    <div className='card card-rounded '>
                      <div className='card-padding text-center'>
                        <h5 className='mb-2 text-dark font-weight-normal'>Ressources</h5>
                        <h2 className='mb-4 text-dark font-weight-bold'>{nbRessource}</h2>
                        <div className='px-4 d-flex align-items-center'>
                          <svg width='0' height='0'>
                            <defs>
                              <linearGradient id='progress-ressources'>
                                <stop offset='0%' stopColor='#e32457' />
                                <stop offset='100%' stopColor='#e32457' />
                              </linearGradient>
                            </defs>
                          </svg>
                          <CircularProgressbarWithChildren
                            className='progress-ressources'
                            value={nbRessource}
                          >
                            <div>
                              <i className='mdi mdi-eye icon-md absolute-center text-dark'></i>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card'>
                    <div className='card card-rounded '>
                      <div className='card-padding text-center'>
                        <h5 className='mb-2 text-dark font-weight-normal'>Réservations</h5>
                        <h2 className='mb-4 text-dark font-weight-bold'>{nbRes}</h2>
                        <div className='px-4 d-flex align-items-center'>
                          <svg width='0' height='0'>
                            <defs>
                              <linearGradient id='progress-reservations'>
                                <stop offset='0%' stopColor='#74b358' />
                                <stop offset='100%' stopColor='#74b358' />
                              </linearGradient>
                            </defs>
                          </svg>
                          <CircularProgressbarWithChildren
                            className='progress-reservations'
                            value={nbRes}
                          >
                            <div>
                              <i className='mdi mdi-calendar-month icon-md absolute-center text-dark'></i>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6 grid-margin stretch-card'>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de réservations par salle</h4>
                        <Line data={datares} options={optionsRes} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 grid-margin stretch-card'>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de réservations chaque mois</h4>
                        <Line data={data} options={options} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 grid-margin stretch-card'>
                    <div className='card card-rounded'>
                      <div className='card-body'>
                        <h4 className='card-title'>Nombre de réservations par Jour</h4>
                        <Line data={dataresParJour} options={optionsResParJour} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
export default Dashboard
