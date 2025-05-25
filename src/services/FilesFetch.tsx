import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MusicFile } from '../models/MusicFile';

export const GetFiles = createAsyncThunk('AudioFile/get', async (_, thunkAPI) => {
    try {
        const response = await axios.get("https://localhost:7264/api/AudioFile/get");
        console.log("get");
        console.log(response.data);
        return response.data as MusicFile[];
    } catch (e) {
        console.log("errorGet");
        return thunkAPI.rejectWithValue(e);
    }
});

export const GetFilesByUserId = createAsyncThunk('AudioFile/getById', async (id, thunkAPI) => {
    try {
        const response = await axios.get(`https://localhost:7264/api/AudioFile/getById`, {
            params: { userId: id }
        });
        console.log("getById");
        return response.data as MusicFile[];
    } catch (e) {
        console.log("errorPost");
        return thunkAPI.rejectWithValue(e);
    }
});

export const UploadFile = createAsyncThunk('MusicFiles/Upload', async ({ file, metadata }: { file: ArrayBuffer, metadata: MusicFile }, thunkAPI) => {
    if (!file) return;
    try {
        if (metadata.MimeType !== "audio/mpeg") {
            alert("הקובץ לא תואם לפורמט mp3");
            return;
        }
        // שלב 1: קבלת Presigned URL מהשרת
        const response = await axios.get(`https://localhost:7264/api/AudioFile/Upload`, {
            params: { fileName: metadata.FileName }
        });
        const presignedUrl = response.data.url;

        console.log(metadata);
        console.log(presignedUrl);

        // שלב 2: העלאת הקובץ ישירות ל-S3
        await axios.put(presignedUrl, file, { // שימוש ב-fileData כגוף הבקשה
            headers: {
                'Content-Type': metadata.MimeType,
            }
        });

        // שלב 3: שמירה בשרת
        saveOnServer(metadata);

        alert('הקובץ הועלה בהצלחה!');
    } catch (error) {
        console.error('שגיאה בהעלאה:', error);
    }
});

export const saveOnServer = async (file: MusicFile) => {

    if (!file.UserId) {
        console.error("User not found");
        return;
    }

    try {
        console.log("Sending to server:", JSON.stringify(file, null, 2));
        const response = await axios.post(
            "https://localhost:7264/api/AudioFile/save",
            file,
            {
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );

        if (response.status === 200) {
            console.log("Response:", response);
            console.log("file saved successfully:", response.data);
        } else {
            console.error("Error saving collage:", response);
        }
    } catch (error: any) {
        console.error("Error saving collage:", error.response || error.message);
    }
};
export const DownloadFile = createAsyncThunk(
    'AudioFile/Download/:fileName',
    async (metadata: MusicFile, thunkAPI) => {
      try {
        if (!metadata?.fileName) {
          return thunkAPI.rejectWithValue({ message: "שם הקובץ לא סופק." });
        }
  
        // שליפת URL זמני מהשרת
        const response = await axios.get(`https://localhost:7264/api/AudioFile/Download`, {
          params: { fileName: metadata.fileName }
        });
  
        const presignedUrl = response.data.url;
  
        const link = document.createElement("a");
        link.href = presignedUrl;
        link.setAttribute("download", metadata.fileName || "audio.mp3"); // השם שיופיע בקובץ
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // ניקוי
  
      } catch (error: any) {
        console.error('שגיאה בהורדה:', error);
        return thunkAPI.rejectWithValue({
          message: error.message,
          status: error.response?.status,
          errors: error.response?.data?.errors
        });
      }
    }
  );
  

  export const PlayFile = createAsyncThunk(
    'AudioFile/Play/:fileName',
    async (metadata: MusicFile, thunkAPI) => {
      try {
        const response = await axios.get(`https://localhost:7264/api/AudioFile/Download`, {
          params: { fileName: metadata.fileName }
        });
  
        const presignedUrl = response.data.url;
  
        // יצירת אובייקט שמע והשמעה
        const audio = new Audio(presignedUrl);
        audio.play();
  
      } catch (error: any) {
        return thunkAPI.rejectWithValue({
          message: error.message,
          status: error.response?.status,
          errors: error.response?.data?.errors
        });
      }
    }
  );
  
export const MusicFilesSlice = createSlice({
    name: 'musicFiles',
    initialState: {
        musicFiles: [] as MusicFile[],
        loading: false,
        error: ' '
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetFiles.pending, (state) => {
                state.loading = true;
                state.error = '';
                console.log("111");
            })
            .addCase(GetFiles.fulfilled, (state, action: PayloadAction<MusicFile[]>) => {
                state.musicFiles = action.payload;
                console.log("222");
            })
            .addCase(GetFiles.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch Files';
                console.log("333");
            })
            .addCase(GetFilesByUserId.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(GetFilesByUserId.fulfilled, (state, action: PayloadAction<MusicFile[]>) => {
                state.musicFiles = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(GetFilesByUserId.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch files';
            })
            .addCase(DownloadFile.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(DownloadFile.fulfilled, (state) => {
                state.loading = false;
                state.error = '';
            })
            .addCase(DownloadFile.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Download File';
            });
    }
});
