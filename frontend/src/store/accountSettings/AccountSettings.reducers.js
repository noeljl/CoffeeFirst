import { createSlice } from '@reduxjs/toolkit'
import {
  getMemberByIdAction, // Bestehende Action
  getMembershipByMemberIDAction, // Membership Action
  updateMemberByIDAction, // Deine neue Action
  changeMemberPasswordAction,
} from './AccountSettings.actions.js' // der Async‑Thunk, der die Mitgliederdaten lädt

// Export, damit andere Dateien (z. B. die Komponente) ihn als Fallback nutzen können
export const initialState = {
  editingField: null,
  firstName: 'Maximilian',
  lastName: 'Müller',
  profilePicture: null, // URL oder File‑Objekt
  email: 'maximilian.mueller@web.de',
  password: {
    current: '',
    new: '',
    confirm: '',
  },
  member: null, // Member data
  membership: null, // Membership data
  error: null,
  isLoading: false,
}

const accountSettingsSlice = createSlice({
  name: 'accountSettings',
  initialState,
  reducers: {
    startEditing: (state, action) => {
      state.editingField = action.payload
    },
    cancelEditing: (state) => {
      state.editingField = null
    },
    updateField: (state, action) => {
      const { field, value } = action.payload

      if (field === 'password') {
        // value: { subField: 'current' | 'new' | 'confirm', subValue: string }
        const { subField, subValue } = value
        if (subField in state.password) {
          state.password[subField] = subValue
        }
      } else if (field in state) {
        state[field] = value
      }
    },
    saveEditing: (state) => {
      state.editingField = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer für getMemberByMailAction
      .addCase(getMemberByIdAction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getMemberByIdAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null

        console.log(
          'COMPLETE ACTION PAYLOAD (getMemberByMail):',
          action.payload
        )
        console.log(
          'ACTION PAYLOAD TYPE (getMemberByMail):',
          typeof action.payload
        )

        const memberData = action.payload // Passt, wenn API direkt das Member-Objekt liefert

        if (memberData && memberData.firstName) {
          // Prüfen auf Gültigkeit der Daten
          console.log(
            'Updating Redux state with (getMemberByMail):',
            memberData
          )
          state.firstName = memberData.firstName
          state.lastName = memberData.lastName
          state.profilePicture = memberData.profilePicture
          state.email = memberData.email
          state.member = memberData // Member-Objekt komplett speichern
          // Passwort und andere sensible/spezifische Felder würden hier normalerweise nicht direkt übernommen,
          // es sei denn, der Anwendungsfall erfordert es und die API gibt sie sicher zurück.
          // Nur Beispielhaft:
          // state.password = { ...state.password, current: '', new: '', confirm: '' }; // Oder nur zurücksetzen
          console.log(
            'State after update (getMemberByMail):',
            JSON.stringify(state)
          )
        } else {
          console.error(
            'MemberData is invalid for getMemberByMail:',
            memberData
          )
        }
      })
      .addCase(getMemberByIdAction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Fehler beim Laden der Mitgliederdaten.'
      })

      // Reducer für getMembershipByMemberIDAction
      .addCase(getMembershipByMemberIDAction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getMembershipByMemberIDAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.membership = action.payload
        console.log('Membership data loaded:', action.payload)
      })
      .addCase(getMembershipByMemberIDAction.rejected, (state, action) => {
        state.isLoading = false
        state.error =
          action.payload || 'Fehler beim Laden der Membership-Daten.'
      })

    builder
      .addCase(updateMemberByIDAction.pending, (state) => {
        // Set loading state when the update request starts
        state.isLoading = true
        state.error = null // Clear any previous errors
      })
      .addCase(updateMemberByIDAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.profilePicture = payload.profilePicture ?? state.profilePicture
        state.firstName = payload.firstName ?? state.firstName
        state.lastName = payload.lastName ?? state.lastName
        state.email = payload.email ?? state.email
      })
      .addCase(updateMemberByIDAction.rejected, (state, action) => {
        // Handle errors if the update request fails
        state.isLoading = false
        state.error = action.error.message || 'Failed to update profile.'
      })
      /* ---------- NEU: Passwörter ---------- */
      .addCase(changeMemberPasswordAction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(changeMemberPasswordAction.fulfilled, (state) => {
        state.isLoading = false
        // hier nichts im State ändern, weil nur Server-Side-Action
      })
      .addCase(changeMemberPasswordAction.rejected, (state, action) => {
        state.isLoading = false
        state.error =
          action.payload || action.error.message || 'Failed to change password.'
      })
  },
})

export const {
  startEditing,
  cancelEditing,
  updateField,
  saveEditing,
  clearError,
} = accountSettingsSlice.actions

export default accountSettingsSlice.reducer
