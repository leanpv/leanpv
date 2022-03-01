import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Flex } from '../../shared/styles';

const RocketMain = () => {

  const [epicId, setEpicId] = useState('vadermatero');
  const [showID, setShowID] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [data3v3, setData3v3] = useState(null);
  const [data2v2, setData2v2] = useState(null);
  const [data1v1, setData1v1] = useState(null);
  const [isRender, setIsRender] = useState(false)

  useEffect(() => {
    epicId ? setShowID(true) : setShowID(false);
  }, [epicId])

  const fetchJSON = async () => {
    const response = await fetch(`/api/v2/rocket-league/standard/profile/epic/${epicId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    let json = await response.json();
    // dataBuilder(json.data.segments)
    // setUserData()
    if (json.errors) {
      setError(json.errors[0].message)
      setUserData(null)
    } else {
      setUserData(json.data.segments)
      setError(null)
    }

    // json.data.segments && getSpecificData(json.data.segments);
    // json.data.segments && console.log(json.data.segments)

    // console.log(data3v3)
    // json.errors ? setError(json.errors[0].message) : setError(null)
  };

  const inputHandler = async (e) => {
    // console.log(e)
    await setEpicId(e.target.value);
    if (e.key === 'Enter') {
      fetchJSON();
      getSpecificData(userData)
    }
  }

  // const dataBuilder = data => {
  //   const ranked3v3 = data[3]
  //   console.log('data', data)

  //   console.log('Ranked 3v3', ranked3v3)
  // }

  const getSpecificData = async (data, title, field) => {
    // const val = data.map(e => e.metadata.name.includes(title) && console.log(e.metadata.name));
    console.log(data)
    data.map(e => {
      e.metadata.name.includes('3v3') && setData3v3(e.metadata);
      e.metadata.name.includes('2v2') && setData2v2(e.metadata);
      e.metadata.name.includes('1v1') && setData1v1(e.metadata);
    });
    setIsRender(true);
    // console.log(data3v3);
  }

  const renderData = data => {
    const name = data[3].metadata.name;
    const stats = data[3].stats;
    return (
      <Flex>
        <h3>{name}</h3>
      </Flex>
    )
  }

  // const keyPressHandler = (event) => {
  //   // console.log(event)
  //   if (event.key === 'Enter') {
  //     fetchJSON();
  //   }
  // }
  // getSpecificData(userData);

  const renderDefs = (title, value2, value1) => (
    <Flex style={{ marginTop: '8px'}}>
      <p style={{margin: '0', fontWeight:'700'}}> {title}:&nbsp;</p>
      <p style={{margin: '0'}}>
        {value1 && ' '+value1 +' - '}
        {value2}
      </p>
    </Flex>
  )

  const renderRanks = (d) => {
    const { metadata, stats } = d;
    const { division, matchesPlayed, rating, tier, winStreak } = stats;
    return (
      <Flex style={{marginBottom: '20px'}} column>
        <p style={{margin: '0', fontWeight:'700', fontSize: '24px'}}>{metadata.name}</p>
        {renderDefs('Rango', division.metadata.name, tier.metadata.name)}
        {renderDefs('MMR', rating.value)}
        {renderDefs('Racha', winStreak.displayValue)}
      </Flex>
    )
  }

  const renderBlock = data => {
    // const {} = data.stats;
    let data1 = null;
    let data2 = null;
    let data3 = null;
    let dataTournaments = null;
    // GIT 
    data.map(e => {
      e.metadata.name.includes('3v3') && (data3 = e);
      e.metadata.name.includes('2v2') && (data2 = e);
      e.metadata.name.includes('1v1') && (data1 = e);
      e.metadata.name.includes('Tournament') && (dataTournaments = e);
    });
    // console.log(data1);
    return (
      <>
        {renderRanks(data3)}
        {renderRanks(data2)}
        {renderRanks(data1)}
        {renderRanks(dataTournaments)}
      </>
    )
  }

  return (
    <Flex column style={{ width: '100%' }}>
      {/* {showID && <h1>{epicId}</h1>} */}
      {/* {userData && getSpecificData(userData,'3v3')} */}
      <Flex style={{ marginBottom: '20px', width:'100%'}}>
        <input value={epicId} onChange={e => inputHandler(e)} style={{ width: '100%' }} placeholder={'epic id'}></input>
        <button disabled={!showID && true} onClick={() => fetchJSON()} >Buscar</button>
      </Flex>
      {/* {!isRender && getSpecificData(userData)} */}
      <Flex marginTop='12px'>
        <p style={{fontSize:'18px', fontWeight:'600'}}>{error}</p>
      </Flex>
      {/* {data1v1 && data1v1.name} */}
      {userData && renderBlock(userData)}
      {/* {userData && renderData(userData)} */}
    </Flex>
  )
}

export default RocketMain