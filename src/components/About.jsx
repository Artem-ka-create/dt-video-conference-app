import React from 'react'

function About() {
  return (
      <>
          <h1>DTMeet video conferencing platform</h1>
          <div>This application was developed as a practical part of diploma thesis</div>
          <h3><b>Integration of open-source communication platforms into Telekom interoperability client</b></h3>
          <h4>Technical University of Košice 2024</h4>

          <div>The deal of my thesis was to create platform for conducting video conferences</div>
          <div>by integrating Jitsi Meet and BigBlueButton video conferencing systems.</div>

          <h3>More detailed info about project can be found in my git repository</h3>
          <div>Client-side of application - <b>https://github.com/Artem-ka-create/dt-video-conference-app</b></div>
          <div>Server-side of application - <b>https://github.com/Artem-ka-create/video-conference-api</b></div>
      </>
  )
}

export default About