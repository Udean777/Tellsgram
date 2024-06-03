import {
    CallContent,
    StreamCall,
    useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import { useLocalSearchParams } from 'expo-router';

export default function CallScreen() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const client: any = useStreamVideoClient()
    const call = client.call('default', id);
    call.join({ create: true });

    return (
        <StreamCall call={call}>
            <CallContent />
        </StreamCall>
    );
}