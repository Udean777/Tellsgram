import {
    CallContent,
    StreamCall,
    useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';

const callId = 'default_82e09110-7c07-4779-876c-6a5ea2f1ce7f';



export default function CallScreen() {
    const client: any = useStreamVideoClient()
    const call = client.call('default', callId);
    call.join({ create: true });

    return (
        <StreamCall call={call}>
            <CallContent />
        </StreamCall>
    );
}