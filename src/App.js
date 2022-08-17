import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './Collection';

const categories = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [collections, setCollections] = useState([])

  useEffect(() => {
    setIsLoading(true)

    const categoryLink = categoryId ? `category=${categoryId}` : ''
    const pageLink = `page=${page}`

    fetch(`https://62c580d6134fa108c25455db.mockapi.io/gallery?${categoryLink}&${pageLink}&limit=5`)
      .then(res => res.json())
      .then(data => {
        setCollections(data)
      })
      .catch(err => {
        console.error(err)
        alert('Ошибка получения данных')
      }).finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((category, idx) => (
            <li onClick={() => { setCategoryId(idx) }} key={idx} className={categoryId === idx ? 'active' : 0}>{category.name}</li>
          ))}
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading
          ? <h2>Loading ...</h2>
          : collections
            .filter(collection => collection.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((collection, idx) => (
              <Collection
                key={idx}
                name={collection.name}
                images={collection.photos}
              />
            ))}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, idx) => (
          <li onClick={() => { setPage(idx + 1) }} className={page === (idx + 1) ? 'active' : ''} key={idx}>{idx + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
