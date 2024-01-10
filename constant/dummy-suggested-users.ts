export const dummySuggestedUsers = [
  {
    id: 1,
    avatar: {
      sex: 'woman',
      faceColor: '#AC6651',
      earSize: 'big',
      eyeStyle: 'smile',
      noseStyle: 'short',
      mouthStyle: 'laugh',
      shirtStyle: 'hoody',
      glassesStyle: 'none',
      hairColor: '#FC909F',
      hairStyle: 'womanShort',
      hatStyle: 'none',
      hatColor: '#77311D',
      eyeBrowStyle: 'upWoman',
      shirtColor: '#9287FF',
      bgColor: 'linear-gradient(45deg, #3e1ccd 0%, #ff6871 100%)'
    },
    name: 'Sarah Tancredi',
    username: '@dr.sarah',
    isFollowed: true
  },
  {
    id: 2,
    avatar: {
      sex: 'man',
      faceColor: '#F9C9B6',
      earSize: 'big',
      eyeStyle: 'circle',
      noseStyle: 'round',
      mouthStyle: 'smile',
      shirtStyle: 'hoody',
      glassesStyle: 'none',
      hairColor: '#D2EFF3',
      hairStyle: 'normal',
      hatStyle: 'none',
      hatColor: '#FC909F',
      eyeBrowStyle: 'up',
      shirtColor: '#9287FF',
      bgColor: 'linear-gradient(45deg, #ff1717 0%, #ffd368 100%)'
    },
    name: 'Kaylynn Aminoff',
    username: '@kay.amin',
    isFollowed: false
  },
  {
    id: 3,
    avatar: {
      sex: 'woman',
      faceColor: '#F9C9B6',
      earSize: 'small',
      eyeStyle: 'oval',
      noseStyle: 'long',
      mouthStyle: 'peace',
      shirtStyle: 'short',
      glassesStyle: 'none',
      hairColor: '#000',
      hairStyle: 'womanLong',
      hatStyle: 'none',
      hatColor: '#77311D',
      eyeBrowStyle: 'upWoman',
      shirtColor: '#FC909F',
      bgColor: 'linear-gradient(45deg, #176fff 0%, #68ffef 100%)'
    },
    name: 'Ruben Passaquindic',
    username: '@ruben.pass',
    isFollowed: true
  },
  {
    id: 4,
    avatar: {
      sex: 'woman',
      faceColor: '#F9C9B6',
      earSize: 'big',
      eyeStyle: 'oval',
      noseStyle: 'short',
      mouthStyle: 'laugh',
      shirtStyle: 'short',
      glassesStyle: 'none',
      hairColor: '#FC909F',
      hairStyle: 'womanShort',
      hatStyle: 'none',
      hatColor: '#506AF4',
      eyeBrowStyle: 'up',
      shirtColor: '#77311D',
      bgColor: '#E0DDFF'
    },
    name: 'Kaiya Herwitz',
    username: '@kai.her',
    isFollowed: false
  }
]

export type ISuggestedUser = typeof dummySuggestedUsers
