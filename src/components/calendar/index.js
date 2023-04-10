import FullCalendar from "@fullcalendar/react";
import koLocale from "@fullcalendar/core/locales/ko";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import {Box, useTheme} from "@mui/material";
import React from "react";
import {tokens} from "../../theme";

const CustomCalendar = ({events, eventSelect, eventClick, eventChange}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box
      mt={3}
      sx={{
        /* buttons */
        '& .fc .fc-button-primary': {
          color: colors.grey[100],
          backgroundColor: colors.blue[700],
          border: 0,
          '&:disabled': {
            backgroundColor: colors.grey[800]
          },
        },
        /* selected buttons */
        '& .fc .fc-button-primary:not(:disabled).fc-button-active': {
          fontWeight: 'bold',
          color: colors.grey[100],
          backgroundColor: colors.greenAccent[700],
          border: `1px solid ${colors.grey[100]}`,
        },

        /* day text */
        '& .fc-day': {
          fontWeight: 'bold',
        },

        /* list day text */
        '& .fc-day.fc-list-day>*': {
          fontWeight: 'normal',
        },

        /* saturday text */
        '& .fc-day.fc-day-sat': {
          color: colors.blue[500],
        },

        /* sunday text */
        '& .fc-day.fc-day-sun': {
          color: colors.red[500],
        },

        /* today */
        '& .fc .fc-daygrid-day.fc-day-today': {
          backgroundColor: `${colors.green[900]}80`,
          border: `3px solid ${colors.greenAccent[400]}`,
          '& .fc-daygrid-day-top': {
            justifyContent: 'space-between',
            '&:after': {
              content: "'(today)'",
              padding: '4px',
            }
          }
        },

        /* highlight */
        '& .fc .fc-highlight': {
          backgroundColor: colors.greenAccent[900],
        },

        /* other days */
        '& .fc-day.fc-day-other': {
          backgroundColor: colors.grey[900],
        },

        /* list - th */
        '& .fc .fc-list-sticky .fc-list-day>*': {
          background: `${colors.green[900]}`,
        },

        /* list - dues hover */
        '& .fc .fc-list-event:hover td': {
          cursor: 'pointer',
          backgroundColor: `${colors.green[900]}60`,
        },

        /* list - today */
        '& .fc .fc-list-day.fc-day-today .fc-list-day-text:after': {
          content: "' (today) '",
          fontWeight: 'bold'
        },
      }}
    >
      <FullCalendar
        locale={koLocale}
        height='70vh'
        plugins={[
          dayGridPlugin,
          listPlugin,
          interactionPlugin,
        ]}
        headerToolbar={{
          left: 'prevYear prev next nextYear today',
          center: 'title',
          right: 'dayGridMonth listMonth'
        }}
        buttonText={{
          dayGridMonth: '달력',
          listMonth: '리스트'
        }}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        select={eventSelect}
        eventClick={eventClick}
        eventChange={eventChange}
      />
    </Box>
  )
}

export default CustomCalendar