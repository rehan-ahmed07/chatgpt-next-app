import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

interface Journal {
  id: string;
  title: string;
  content: string;
  location: string;
  date: string;
  images?: string[];
}

interface JournalState {
  journals: Journal[];
  currentJournal: Journal | null;
  loading: boolean;
  error: string | null;
}

const initialState: JournalState = {
  journals: [],
  currentJournal: null,
  loading: false,
  error: null,
};

export const fetchJournals = createAsyncThunk('journal/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('journals');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch journals');
  }
});

export const createJournal = createAsyncThunk(
  'journal/create',
  async (journalData: Omit<Journal, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('journals', journalData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create journal');
    }
  }
);

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setCurrentJournal: (state, action) => {
      state.currentJournal = action.payload;
    },
    clearJournalError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Journals
      .addCase(fetchJournals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJournals.fulfilled, (state, action) => {
        state.loading = false;
        state.journals = action.payload;
      })
      .addCase(fetchJournals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Journal
      .addCase(createJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.journals.push(action.payload);
      })
      .addCase(createJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentJournal, clearJournalError } = journalSlice.actions;
export default journalSlice.reducer;