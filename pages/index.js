import Image from 'next/image'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import Fade from 'react-reveal/Fade'
import Rotate from 'react-reveal/Rotate'
import Flip from 'react-reveal/Flip'
import Jello from 'react-reveal/Jello'
import RubberBand from 'react-reveal/Jello'

const SectionWrapper = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ isReverse = false }) => (isReverse ? 'row-reverse' : 'row')};
  margin: 40px 0;
`
const SECTION_LIST = [
  {
    title: 'React-To-Pdf',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quas. Voluptatum, quidem. Quia, nam.Quibusdam voluptate, quas, quos, voluptatibus autem quod quia voluptates quibusdam doloribus. Quibusdam,quod. Quibusdam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quas. Voluptatum,quidem. Quia, nam. Quibusdam voluptate, quas, quos, voluptatibus autem quod quia voluptates quibusdamdoloribus. Quibusdam, quod. Quibusdam, quod.',
    imageUrl: 'https://picsum.photos/id/100/600/500',
    bgc: '#D6CDA4',
    animateFn: (child, animateProps) => {
      return (
        <Fade {...animateProps}>
          <RubberBand>{child}</RubberBand>
        </Fade>
      )
    },
  },
  {
    title: 'React-To-Print',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quas. Voluptatum, quidem. Quia, nam.Quibusdam voluptate, quas, quos, voluptatibus autem quod quia voluptates quibusdam doloribus. Quibusdam,quod. Quibusdam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quas. Voluptatum,quidem. Quia, nam. Quibusdam voluptate, quas, quos, voluptatibus autem quod quia voluptates quibusdamdoloribus. Quibusdam, quod. Quibusdam, quod.',
    imageUrl: 'https://picsum.photos/id/1042/600/500',
    bgc: '#25316D',
    animateFn: (child, animateProps) => {
      return <Rotate {...animateProps}>{child}</Rotate>
    },
  },
  {
    title: 'React-Render-PDF',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quas. Voluptatum, quidem. Quia, nam.Quibusdam voluptate, quas, quos, voluptatibus autem quod quia voluptates quibusdam doloribus. Quibusdam,quod. Quibusdam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quas. Voluptatum,quidem. Quia, nam. Quibusdam voluptate, quas, quos, voluptatibus autem quod quia voluptates quibusdamdoloribus. Quibusdam, quod. Quibusdam, quod.',
    imageUrl: 'https://picsum.photos/id/1079/600/500',
    bgc: '#372948',
    animateFn: (child, animateProps) => {
      return (
        <Flip {...animateProps}>
          <Jello>{child}</Jello>
        </Flip>
      )
    },
  },
]

export default function Home() {
  function renderSectionsView() {
    return SECTION_LIST.map((sectionItem) => {
      return (
        <SectionWrapper key={sectionItem.title} style={{ backgroundColor: sectionItem.bgc }}>
          <Grid container xs={4} md={6} lg={8} xl={10} justifyContent={'space-between'} alignItems={'center'}>
            <Grid item xs={4}>
              {sectionItem.animateFn(<Image alt="pdf" height={250} width={350} src={sectionItem.imageUrl} />, {
                left: true,
                unmountOnExit: true,
              })}
            </Grid>
            <Grid item xs={7}>
              {sectionItem.animateFn(
                <>
                  <h1>{sectionItem.title}</h1>
                  <p>{sectionItem.content}</p>
                </>,
                {
                  right: true,
                }
              )}
              <Fade right></Fade>
            </Grid>
          </Grid>
        </SectionWrapper>
      )
    })
  }

  return <div>{renderSectionsView()}</div>
}
