'use client';

import { useEffect, useState } from 'react';
import { extractLevelsData } from '../admin/axios/queries';

function DownloadDbData() {
  const [jsonData, setJsonData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await extractLevelsData()
        setJsonData(data) // Almacenar los datos directamente, sin serializar
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleDownload = () => {
    if (jsonData) {
      const blob = new Blob([jsonData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'levels.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <button className='bg-selectedPrimaryColor text-grayColor font-medium py-2 px-4 rounded-lg' onClick={handleDownload}>
      Download DB Data
    </button>
  )
}

export default DownloadDbData;
