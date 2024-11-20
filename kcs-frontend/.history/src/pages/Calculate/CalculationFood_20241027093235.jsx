import React, { useState } from 'react'
import { getAllFish } from '../../api/pond_fish';
import { useEffect } from 'react';

function CalculationFood() {
  const [selectedFish, setSelectedFish] = useState({ fishName: '', fishWeight: 0 });
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [koiFishes,setKoiFishes] = useState([]);


  useEffect(()=>{
      getFoiFishList();
  },[])
  const getFoiFishList = async () =>{
      try {
           const res = await getAllFish();
           setKoiFishes(res.result)
      } catch (error) {
            console.log(error)
      }
  }

  const isSeason = (date) => {
    
    const month = new Date(date).getMonth() + 1;
    if (month >= 1 && month <= 3)
      return 'Xuân';
    if (month >= 4 && month <= 6)
    return 'Hạ';
    if (month >= 7 && month <= 9)
      return 'Thu';
    if (month >= 10 && month <= 12)
      return 'Đông';
  };

  const isSummerSeason = (date) => {
    const month = new Date(date).getMonth() +1;
    return month >= 4 && month <=6;
  }

  const calculateFeedingAmount = (weight, date) => {
    const feedingPercentage = isSummerSeason(date) ? 0.03 : 0.02;
    return weight * feedingPercentage;
  };

  const handleFishSelect = (Id) => {
      console.log(Id)
      console.log(koiFishes)
    const fish = koiFishes.find(f => f.fishId == Id);
    console.log(fish)
    if (fish) {
      setSelectedFish(fish);
    }
  };

  const feedingAmount = calculateFeedingAmount(selectedFish.fishWeight, date);

  return (
    <div className="max-w-md mx-auto p-2" style={{minWidth:'800px', maxWidth:'1000px', backgroundColor:'#f0f0f0', border:'1px solid grey', borderRadius:'8px', boxShadow: "0 2px 4px rgba(1, 2, 2, 4)"}}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800" style={{fontFamily: 'Verdana'}}>Koi Feeding Calculator</h2>
      
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Lựa chọn cá
        </label>
        <select 
          className="w-full p-2 border rounded"
          value={selectedFish.fishId}
          onChange={(e) => handleFishSelect(e.target.value)}
        >
          <option value="">Select a fish</option>
          {koiFishes.map(fish => (
            <option key={fish.fishId} value={fish.fishId}>
              {fish.fishName} - {fish.fishWeight}g
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Chọn ngày
        </label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {selectedFish.fishId && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Kết quả:</h3>
          <p>Tên: {selectedFish.fishName}</p>
          <p>Khối lượng: {selectedFish.fishWeight}g</p>
          <p>Mùa: {isSeason(date?new Date():date)}</p>
          <p>Feeding Rate: {isSummerSeason(date) ? '3%' : '2%'}</p>
          <p className="text-lg font-bold text-blue-600 mt-2">
            Lượng thức ăn mỗi ngày: {feedingAmount.toFixed(1)}g
          </p>
        </div>
      )}
    </div>
  );
}

export default CalculationFood