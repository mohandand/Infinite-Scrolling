import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    console.log('I am excuted');
    for (let i = 0; i < 9; i++) {
      fetch(`https://dog.ceo/api/breeds/image/random`)
        .then((data) => data.json())
        .then((res) => {
          let newData = data;
          newData.push(res.message);
          setData([...newData]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (!loading) {
          setLoading(true);
          fetchData();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div className="container">
      {data.map((img) => {
        return <img src={img} />;
      })}
    </div>
  );
}
