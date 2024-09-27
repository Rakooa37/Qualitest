import { Box, Card, CardContent, CardHeader, Typography, Avatar } from "@mui/material";

const sizes = {
    'sm': 200,
    'md': 300,
    'lg': 500
}

interface PropsTypes{
    id: number,
    image: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    size?: 'sm' | 'md' | 'lg',
    fadeIn?: boolean 
}

export default function ClientPersonalizationCard(props: PropsTypes) {
    const { id, image, firstName, lastName, email, username, size = 'sm', fadeIn = true} = props;

    return (
        <Card elevation={3} sx={{ display: "flex", flexDirection: "column", width: sizes[size], p: 2, transition: 'opacity 0.5s ease-in-out', opacity: fadeIn ? 1 : 0}} id={id}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Avatar
                    src={image}
                    alt={`${firstName} ${lastName}`}
                    sx={{ width: 80, height: 80 }}
                />
            </Box>

            <CardHeader
                title={username}
                titleTypographyProps={{ variant: 'h6', align: 'center', fontWeight: 'bold' }}
                sx={{ textAlign: 'center', mb: 1 }}
            />

            <CardContent
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" fontWeight="bold">{firstName} {lastName}</Typography>
                </Box>

                <Typography variant="caption" color="textSecondary">{email}</Typography>
            </CardContent>
        </Card>
    );
}