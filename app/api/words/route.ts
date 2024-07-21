import { connectDB } from '@/app/lib/db/connection'
import Levels from '@/app/lib/db/models/levels'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic' // defaults to auto SOLO PARA DATOS DINAMICOS CON GET, SI SON ESTATICOS Y NO VAN A CAMBIAR Y NO SON GET, QUITARLO

export async function POST(request: Request) {
  try {
    await connectDB()
    const { level, topic, wordsList } = await request.json()
    const levelData = await Levels.findOne({ level })
    console.log(levelData, 'levelData')

    const lines = wordsList.split("\n")

    lines.forEach((line: any) => {
      const oneLineWords = line.trim().split(/\t+/)
      // console.log(oneLineWords, 'oneLineWords')

      if (levelData.topics[topic].find((word: any) => word.word[0] === oneLineWords[1])) { // oneLineWords[1] = German Word
        return NextResponse.json({ message: 'Word already exists', error: 'Word already exists' })
      }

      levelData.topics[topic].push(
        {
          word: [oneLineWords[1], oneLineWords[0]],
        }
      )
    })

    const wordsUpdated = await Levels.updateOne({ level }, { $set: { [`topics.${topic}`]: levelData.topics[topic] } })
    return NextResponse.json({ message: 'Words updated successfully', newWords: wordsUpdated, levelData, })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, message: 'Error to post level' })
  }
}



/* Delete the known_by_0... of all the words */

// export async function DELETE(request: Request) {
//   try {
//     await connectDB();
//     const levelDataOne = await Levels.findOne({ level: 'A1' });
//     const levelDataTwo = await Levels.findOne({ level: 'A2' });
//     const levelDataThree = await Levels.findOne({ level: 'B1' });
//     const levelDataFour = await Levels.findOne({ level: 'B2' });

//     // Iterate over each topic and word object to remove known_by properties
//     const updatedTopicsOne = { ...levelDataOne.topics };

//     for (const topicKey in updatedTopicsOne) {
//       if (updatedTopicsOne.hasOwnProperty(topicKey)) {
//         updatedTopicsOne[topicKey] = updatedTopicsOne[topicKey].map((wordObject: any) => {
//           const newWordObject = { ...wordObject };
//           delete newWordObject.known_by_0;
//           delete newWordObject.known_by_1;
//           delete newWordObject.known_by_2;
//           delete newWordObject.known_by_3;
//           delete newWordObject.known_by_4;
//           return newWordObject;
//         })
//       }
//     }
//     const updatedTopicsTwo = { ...levelDataTwo.topics };

//     for (const topicKey in updatedTopicsTwo) {
//       if (updatedTopicsTwo.hasOwnProperty(topicKey)) {
//         updatedTopicsTwo[topicKey] = updatedTopicsTwo[topicKey].map((wordObject: any) => {
//           const newWordObject = { ...wordObject };
//           delete newWordObject.known_by_0;
//           delete newWordObject.known_by_1;
//           delete newWordObject.known_by_2;
//           delete newWordObject.known_by_3;
//           delete newWordObject.known_by_4;
//           return newWordObject;
//         })
//       }
//     }
//     const updatedTopicsThree = { ...levelDataThree.topics };

//     for (const topicKey in updatedTopicsThree) {
//       if (updatedTopicsThree.hasOwnProperty(topicKey)) {
//         updatedTopicsThree[topicKey] = updatedTopicsThree[topicKey].map((wordObject: any) => {
//           const newWordObject = { ...wordObject };
//           delete newWordObject.known_by_0;
//           delete newWordObject.known_by_1;
//           delete newWordObject.known_by_2;
//           delete newWordObject.known_by_3;
//           delete newWordObject.known_by_4;
//           return newWordObject;
//         })
//       }
//     }

//     const updatedTopicsFour = { ...levelDataFour.topics };

//     for (const topicKey in updatedTopicsFour) {
//       if (updatedTopicsFour.hasOwnProperty(topicKey)) {
//         updatedTopicsFour[topicKey] = updatedTopicsFour[topicKey].map((wordObject: any) => {
//           const newWordObject = { ...wordObject };
//           delete newWordObject.known_by_0;
//           delete newWordObject.known_by_1;
//           delete newWordObject.known_by_2;
//           delete newWordObject.known_by_3;
//           delete newWordObject.known_by_4;
//           return newWordObject;
//         })
//       }
//     }

//     // Update the document in the database
//     await Levels.updateOne({ level: 'A1' }, { $set: { topics: updatedTopicsOne } });
//     await Levels.updateOne({ level: 'A2' }, { $set: { topics: updatedTopicsTwo } });
//     await Levels.updateOne({ level: 'B1' }, { $set: { topics: updatedTopicsThree } });
//     await Levels.updateOne({ level: 'B2' }, { $set: { topics: updatedTopicsFour } });

//     return NextResponse.json({ message: 'Known words properties deleted successfully', updatedTopicsOne, updatedTopicsTwo, updatedTopicsThree, updatedTopicsFour });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message, message: 'Error delete known words properties' })
//   }
// }
